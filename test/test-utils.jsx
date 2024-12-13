import * as React from "react";
import { render as rtlRender } from "@testing-library/react";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { vi } from "vitest";

import { config } from "../wagmi";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";

// Mock router
const createMockRouter = (props) => ({
  push: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
  back: vi.fn(),
  reload: vi.fn(),
  forward: vi.fn(),
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  ...props,
});

const queryClient = new QueryClient();

function render(
  ui,
  {
    route = "/",
    router = createMockRouter({ pathname: route }),
    ...options
  } = {}
) {
  const Wrapper = ({ children }) => (
    <RouterContext.Provider value={router}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </RouterContext.Provider>
  );
  const utils = rtlRender(ui, { wrapper: Wrapper, ...options });
  return {
    ...utils,
    router, // Return the mocked router
  };
}

export * from "@testing-library/react";
// override React Testing Library's render with our own
export { render };
