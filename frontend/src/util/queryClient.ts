import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // @desc Data freshness settings
      staleTime: 10 * 1000, // @desc 10 seconds: data can be considered fresh for a short period as it's updated frequently
      retry: 2, // @desc Retry twice before failing (for network reliability)
      refetchOnWindowFocus: false, // Avoid refetching when the window regains focus
      refetchInterval: false, // No need to poll since WebSocket pushes updates
      refetchOnReconnect: true,// @desc Refetch data if the user is reconnected after network issues
    },
    mutations: {
      // @desc Handling mutations like sending messages
      retry: 3, // @desc Retry mutations 3 times before failing (useful for network reliability during message sends)
      onError: (error) => {
        console.error("Mutation Error:", error);
      },
    },
  },
});
