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


type QueryKeyWithData<D> = QueryKey & D

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
  FnData extends any,
>(
  key: QueryKey,
) {
  // const { queryFn, ...clientDefaultOptions} = options

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
    queryFn: QueryFunction<FnData> | FnData
  ) {
    const queryClient = getQueryClient()

    if (typeof queryFn === "function") {
      await queryClient.prefetchQuery({
        // ...options,
        queryKey: key,
        queryFn: queryFn as QueryFunction<FnData>,
      })
    } else {
      await queryClient.prefetchQuery({
        // ...options,
        queryKey: key,
        queryFn: () => queryFn,
      })
    }
  }

  return function <
    FnMutations extends {
      [key: string]: (prev: FnData) => (newData: any) => FnData
    }
  >(mutations?: FnMutations) {

    // [Client Only]
    // Creates a function to consume the data rehydrated by the
    //  hydration boundary. Guarantess type-safety
    function useHook(
      clientOptions?: Partial<UndefinedInitialDataOptions<FnData>>
    ) {
      const queryClient = useQueryClient()
      const query = useQuery({
        // ...clientDefaultOptions,
        queryKey: key,
        ...clientOptions
      });

      (query as any).setData = (fn: ((prev: FnData) => FnData)) => queryClient.setQueryData(key, fn as unknown)

      for (const mutationName in mutations) {
        (query as any)[mutationName] = (newData: any) => queryClient.setQueryData(key, (prev) => mutations[mutationName](prev as FnData)(newData))
      }

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
