import { HydrationBoundary as RQHydrationBoundary, HydrationBoundaryProps, QueryClient, QueryClientConfig, UndefinedInitialDataOptions, dehydrate, useQuery, QueryFunction } from "@tanstack/react-query"
import { cache } from "react"

// Server Only
export const getQueryClient = cache(
  (option?: QueryClientConfig) => new QueryClient(option)
)

export function createQuery<FnData extends any>(
  options: UndefinedInitialDataOptions<FnData>
) {
  const { queryFn, ...clientDefaultOptions} = options
  
  async function prefetch(
    queryFn: QueryFunction<FnData>
  ) {
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery({
      ...options,
      queryFn,
    })
    return function HydrationBoundary(
      props: Omit<HydrationBoundaryProps, 'state'>
    ) {
      return <RQHydrationBoundary state={ dehydrate(queryClient) } { ...props } />
    }
  }

  // Client Only
  function useHook(
    clientOptions?: Partial<UndefinedInitialDataOptions<FnData>>
  ) {
    return useQuery({
      ...clientDefaultOptions,
      ...clientOptions
    })
  }

  return {
    prefetch,
    useHook,
  }
}
