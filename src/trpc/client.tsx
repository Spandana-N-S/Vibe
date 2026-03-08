'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCContext } from '@trpc/tanstack-react-query';
import { useState } from 'react';
import SuperJSON from 'superjson';
import { makeQueryClient } from './routers/query-client';
import type { AppRouter } from './routers/_app';

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient();
  }
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

function getUrl() {
  if (typeof window !== 'undefined') {
    // Client-side: use relative URL
    return '/api/trpc';
  }
  // Server-side: use full URL
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}/api/trpc`;
  return `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3002'}/api/trpc`;
}

const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      transformer: SuperJSON,
      url: getUrl(),
    }),
  ],
});

// tRPC v11 context
const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

export function TRPCReactProvider(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  const queryClient = getQueryClient();
  const [trpcClientInstance] = useState(() => trpcClient);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClientInstance} queryClient={queryClient}>
        {props.children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}

export { useTRPC };

