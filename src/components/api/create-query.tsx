import { HydrationBoundary as RQHydrationBoundary, QueryClient, QueryClientConfig, UndefinedInitialDataOptions, dehydrate, useQuery, QueryFunction, QueryKey, useQueryClient, QueryFilters } from "@tanstack/react-query"
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
  key: QueryKeyWithData<FnData>,
  data: FnData
) {
  getQueryClient().prefetchQuery({
    queryKey: key,
    queryFn: () => data
  })
}


export function createQuery<FnData>(
  key: QueryKey,
  // options?: UndefinedInitialDataOptions<FnData>
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


    // return function HydrationBoundary(
    //   props: Omit<HydrationBoundaryProps, 'state'>
    // ) {
    //   return <RQHydrationBoundary state={dehydrate(queryClient)} {...props} />
    // }
  }

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
    (query as any).setData = (fn: ((prev: FnData) => FnData)) => queryClient.setQueriesData(key as QueryFilters, fn as unknown)

    const res = query

    return res as typeof query & {
      setData: (fn: ((prev: FnData) => FnData)) => void
    }
  }

  return {
    prefetch,
    useHook,
    key: key as QueryKeyData<FnData>,
    // keys: options.queryKey as QueryKeyWithData<FnData>
  }
}
