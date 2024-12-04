import Nav from "@/components/nav";
import { HomeIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

export default function Home() {
  const router = useRouter();

  const { address } = useAccount();

  if (address) {
    router.push("/dashboard");
  }

  return (
    <div>
      <Nav />
      <div className="flex flex-row items-start gap-10 px-10">
        <div className="flex flex-col w-[300px]">
          <div className="py-3 px-3 mr-3 mb-3 flex-auto  flex flex-row items-center gap-2 border border-gray-300 rounded">
            <HomeIcon className="w-[30px] h-[30px]" />
            <p>Home</p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="bg-blue-100/50 rounded w-full p-10 text-blue-500 ">
            <p className="font-bold mb-3">Welcome to Token Swoosh WebApp !</p>
            <p>
              Connect your wallet to get started and transfer batches of NFTs of
              any collection you own on Avalanche.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
