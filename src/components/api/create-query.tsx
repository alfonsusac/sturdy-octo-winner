import { HydrationBoundary as RQHydrationBoundary, HydrationBoundaryProps, QueryClient, QueryClientConfig, UndefinedInitialDataOptions, dehydrate, useQuery, QueryFunction, HydrationBoundary, QueryKey, useQueryClient, QueryFilters, Updater, UseQueryResult } from "@tanstack/react-query"
import { ReactNode, cache } from "react"

// Server Only
export const getQueryClient = cache(
  (option?: QueryClientConfig) => new QueryClient(option)
)

// Server Only. Hydrates any query client that is present in the current request.
export function HydrateState(
  props: {
    children: ReactNode
  }
) {
  const qc = getQueryClient()
  return (
    <RQHydrationBoundary state={dehydrate(qc)}>
      {props.children}
    </RQHydrationBoundary>
  )
}


type QueryKeyWithData<D> = QueryKey & D

export function prefetch<FnData extends any>(
  key: QueryKeyWithData<FnData>,
  data: FnData
) {
  getQueryClient().prefetchQuery({
    queryKey: key,
    queryFn: () => data
  })
}


export function createQuery<FnData extends any>(
  key: QueryKey,
  // options?: UndefinedInitialDataOptions<FnData>
) {
  // const { queryFn, ...clientDefaultOptions} = options
  
  // [Server-Only]
  // Creates a prefetching function that prefetches a data 
  //  and prepares them into qc where it can by dehydrated into the boundary
  //  and get rehydrated in the client
  async function prefetch(
    queryFn: QueryFunction<FnData>
  ) {
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery({
      // ...options,
      queryKey: key,
      queryFn,
    })
    return function HydrationBoundary(
      props: Omit<HydrationBoundaryProps, 'state'>
    ) {
      return <RQHydrationBoundary state={ dehydrate(queryClient) } { ...props } />
    }
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
    // (query as any).invalidate = () => queryClient.invalidateQueries(key as QueryFilters)
    // (query as any)[Symbol.iterator] = () => {
    //   return Object.keys(query)
    // }
    // (query as any)[0] = query.data;
    // (query as any)[1] = (fn:((prev: FnData)=>FnData)) => queryClient.setQueriesData(key as QueryFilters, fn as unknown)
    // const q = useQuery({
    //   // ...clientDefaultOptions,
    //   queryKey: key,
    //   ...clientOptions
    // })
    // return query as UseQueryResult<FnData, Error> & {
    //   [0]: FnData,
    //   [1]: (fn: ((prev: FnData) => FnData)) => void
    // }
    // return query as UseQueryResult<FnData, Error> & [
    //   FnData,
    //   (fn: ((prev: FnData) => FnData)) => void
    // ]
    return query as UseQueryResult<FnData, Error> & {
      setData: (fn: ((prev: FnData) => FnData)) => void
    }
  }

  return {
    prefetch,
    useHook,
    key,
    // keys: options.queryKey as QueryKeyWithData<FnData>
  }
}
