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
export function HydrateState(
  props: {
    children: ReactNode,
  }
) {
  return (
    <RQHydrationBoundary state={dehydrate(getQueryClient())}>
      {props.children}
    </RQHydrationBoundary>
  )
}



type QueryKeyWithData<Data extends any> = QueryKey & { data: Data }

export function prepareQuery<FnData extends any>(
  key: QueryKey,
  data: FnData
) {
  getQueryClient().prefetchQuery({
    queryKey: key,
    queryFn: () => data
  })
}






export function createQuery<
  FnData extends any
>(

) {

  return function defineQueryKeyParams<
    KeyParams extends any[] = []
  >(
    key: QueryKey | ((...params: KeyParams) => QueryKey),
  ) {
    const isQueryKeyAFunction = typeof key === "function"

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
      // queryFn: QueryFunction<FnData> | FnData,
      // params: KeyParams
      ...args: KeyParams extends []
        ? [
          ...Parameters<(queryFn: QueryFunction<FnData> | FnData) => {}>
        ]
        : [
          ...Parameters<(keyParams: KeyParams) => {}>,
          ...Parameters<(queryFn: QueryFunction<FnData> | FnData) => {}>
        ]
    ) {

      const queryFn = (isQueryKeyAFunction ? args[1] : args[0]) as QueryFunction<FnData> | FnData
      const params = (isQueryKeyAFunction ? args[0] : undefined)

      await getQueryClient().prefetchQuery({

        queryKey: (() => {
          if (typeof key === "function") {
            return key(...params as any)
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
        // params: KeyParams
        // clientOptions?: Partial<UndefinedInitialDataOptions<FnData>>,
        ...args: KeyParams extends []
          ? [
          ...Parameters<(clientOption?: Partial<UndefinedInitialDataOptions<FnData>>) => void>
        ]
          : [
          ...Parameters<(keyParams: KeyParams) => {}>,
          ...Parameters<(clientOption?: Partial<UndefinedInitialDataOptions<FnData>>) => void>
        ]
      ) {
        // This step extracts the parameters 
        const clientOptions = (isQueryKeyAFunction ? args[1] : args[0]) as Partial<UndefinedInitialDataOptions<FnData>>
        const params = (isQueryKeyAFunction ? args[0] : undefined)

        // Function to process the query function
        function getKey() {
          if (typeof key === "function") {
            return key(...params as any)
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
        key,
        mutations,
      }
    }
  }

}
