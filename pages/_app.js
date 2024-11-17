import "@/styles/globals.css";
import "@radix-ui/themes/styles.css";

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';

import { WagmiProvider } from 'wagmi';
import {avalanche} from 'wagmi/chains';

import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: 'Transfer Web App',
  projectId: '10a8065146f97942c2292a8f5be7e096',
  chains: [avalanche],
  ssr: true,
});
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {

  return (
  <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Component {...pageProps} />
        </RainbowKitProvider>
        </QueryClientProvider>
    </WagmiProvider>

  )
}
