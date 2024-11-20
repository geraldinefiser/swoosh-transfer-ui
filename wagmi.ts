import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { avalanche } from "wagmi/chains";
import { http } from "wagmi";

export const config = getDefaultConfig({
  appName: "Transfer Web App",
  projectId: "10a8065146f97942c2292a8f5be7e096",
  chains: [avalanche],
  ssr: true,
  transports: {
    [avalanche.id]: http(
      `https://avax-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`
    ),
  },
});
