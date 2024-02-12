import {
  HydrationBoundary as RQHydrationBoundary,
  QueryClient,
  QueryClientConfig,
  UndefinedInitialDataOptions,
  dehydrate,
  useQuery,
  QueryFunction,
  QueryKey,
  useQueryClient,
  UseQueryResult
} from "@tanstack/react-query"
import { ReactNode, cache } from "react"



// Server Only
export const getQueryClient = cache(
  (option?: QueryClientConfig) => new QueryClient(option)
)

// Server Only. Hydrates any query client that is present in the current request.
type QueryKeyData<Data extends any> = QueryKey & { data: Data }
type Query<Data extends any = unknown> = { data: Data, key: QueryKeyData<Data> }

export function HydrateState(
  props: {
    children: ReactNode,
    queries?: Query[]
  }
) {
  return (
    <RQHydrationBoundary state={dehydrate(getQueryClient())}>
      {props.children}
    </RQHydrationBoundary>
  )
}






export function prepareQuery<FnData extends any>(
  key: QueryKey,
  data: FnData
) {
  getQueryClient().prefetchQuery({
    queryKey: key,
    queryFn: () => data
  })
}





type QueryKeyFn<T extends ReadonlyArray<unknown>> = (...params: T) => QueryKey

export function createQuery<
  FnData extends any
>(

) {

  return function defineQueryKeyParams<
    KeyParams extends ReadonlyArray<unknown> = never
  >(
    key: QueryKey | QueryKeyFn<KeyParams>,
  ) {
    const queryKeyParamCount = (() => {
      if (typeof key === "function") return key.arguments.count
      else return 0
    })()



    // [Server-Only]
    // Creates a prefetching function that prefetches a data
    //  and prepares them into qc where it can by dehydrated into the boundary
    //  and get rehydrated in the client
    //  - update #1: this is already perfect because on a
    //     single request, you only need one HydrateState since getQueryClient is cached.
    //     Therefore if you call prefetch function deep in server component, it will
    //     still be hydrated in the client!!
    //     Do not find solution to pass the prefetched data to HydrateState!
    //  - update #2: No longer need RQHydrationBoundary because we already have HydrateState
    //  - update #3: Now you can pass values in here.
    
    async function prefetch(
      // params: KeyParams,
      // queryFn: QueryFunction<FnData> | FnData,
      ...args: KeyParams[0] extends never
        ? [...Parameters<(queryFn: QueryFunction<FnData> | FnData) => {}>]
        : [...KeyParams, ...Parameters<(queryFn: QueryFunction<FnData> | FnData) => {}>]
    ) {
      const params = args.slice(0, queryKeyParamCount) as any as KeyParams
      const queryFn = args[queryKeyParamCount] as QueryFunction<FnData> | FnData


      await getQueryClient().prefetchQuery({

        queryKey: (() => {
          if (typeof key === "function") {
            return key(...params)
          } else {
            return key
          }
        })(),

        queryFn: (() => {
          if (typeof queryFn === "function") {
            return queryFn as QueryFunction<FnData>
          } else {
            return () => queryFn
          }
        })(),

      })
    }



    return function defineQueryMutations<
      FnMutations extends {
        [key: string]: (prev: FnData) => (newData: any) => FnData
      }
    >(
      mutations?: FnMutations
    ) {


      // [Client Only]
      // Creates a function to consume the data rehydrated by the
      //  hydration boundary. Guarantess type-safety
      function useHook(
        ...args: KeyParams[0] extends never
          ? [...Parameters<(clientOption?: Partial<UndefinedInitialDataOptions<FnData>>) => void>]
          : [...KeyParams, ...Parameters<(clientOption?: Partial<UndefinedInitialDataOptions<FnData>>) => void>]
      ) {
        // This step extracts the parameters 
        const params = args.slice(0, queryKeyParamCount) as any as KeyParams
        const clientOptions = args[queryKeyParamCount] as Partial<UndefinedInitialDataOptions<FnData>>

        // Function to process the query function
        function getKey() {
          if (typeof key === "function") {
            return key(...params)
          } else {
            return key
          }
        }

        // Pre-define the use query function
        const query = useQuery({
          queryKey: getKey(),
          ...clientOptions
        })

        // Transfer all mutation function to useHook
        const queryClient = useQueryClient()
        ; (query as any).setData = (fn: ((prev: FnData) => FnData)) => queryClient.setQueryData(getKey(), fn as unknown)
        for (const mutationName in mutations) {
          ; (query as any)[mutationName] = (newData: any) => queryClient.setQueryData(getKey(), (prev) => mutations[mutationName](prev as FnData)(newData))
        }

        // Return the use hook result with proper typings
        return query as UseQueryResult<FnData, Error>
          & {
            setData: (fn: ((prev: FnData) => FnData)) => void
          }
          & {
            [key in keyof FnMutations]: (...arg: Parameters<ReturnType<FnMutations[key]>>) => ReturnType<ReturnType<FnMutations[key]>>
          }
      }

      return {
        prefetch,
        useHook,
        key: key as QueryKeyData<FnData>,
        mutations,
        // keys: options.queryKey as QueryKeyWithData<FnData>
      }
    }
  }

}
