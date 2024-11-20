import Nav from "@/components/nav";
import NftTable from "@/components/nftTable";
import { HomeIcon } from "@heroicons/react/24/outline";
import { Avatar, RadioCards, Badge, Code, ScrollArea } from "@radix-ui/themes";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { useAccount } from "wagmi";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { address } = useAccount();

  const { data } = useSWR(
    address ? `/api/fetch-collections?for_address=${address}` : null,
    fetcher,
    { focusThrottleInterval: 120000, dedupingInterval: 120000 }
  );

  const [selectedCollectionAddress, setSelectCollectionAddress] = useState();

  const { data: nftData, mutate: mutateNfts } = useSWR(
    address && selectedCollectionAddress
      ? `/api/fetch-nfts?for_address=${address}&for_collection=${selectedCollectionAddress}`
      : null,
    fetcher,
    { focusThrottleInterval: 120000, dedupingInterval: 120000 }
  );

  useEffect(() => {
    if (data.collections.length > 0 && !selectedCollectionAddress) {
      setSelectCollectionAddress(data.collections[0].contract.address);
    }
  }, [data, selectedCollectionAddress]);

  if (!address) {
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
          <div className="bg-blue-100/50 rounded w-full p-10 text-blue-500 ">
            <p className="font-bold mb-3">Welcome to Token Swoosh WebApp !</p>
            <p>
              Connect your wallet to get started and transfer NFTs by batch for
              any collection you own on Avalanche.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (data?.collections?.length === 0) {
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
          <div className="bg-blue-100/50 rounded w-full p-10 text-blue-500 ">
            <p className="font-bold mb-3">Welcome to Token Swoosh WebApp !</p>
            <p>
              Connect your wallet to get started and transfer NFTs by batch for
              any collection you own on Avalanche.
            </p>
          </div>
          <div className="bg-blue-100/50 rounded w-full p-10 text-blue-500 ">
            <p className="font-bold mb-3">No NFTs to transfer in this wallet</p>
            <p>Connect your another wallet</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Nav />

      <div className="flex flex-row items-start gap-10 px-10">
        <div className="flex flex-col w-[300px] h-[calc(100vh_-_80px)]">
          {/* <div className="py-3 px-3 mr-3 mb-3 flex-auto  flex flex-row items-center gap-2 border border-gray-200 rounded">
            <HomeIcon className="ml-1 w-[30px] h-[30px]" />
            <p>Home</p>
          </div> */}

          <ScrollArea
            type="always"
            scrollbars="vertical"
            style={{ height: "100%", width: 300, paddingRight: 15 }}
          >
            <RadioCards.Root
              columns={{ initial: "1" }}
              value={selectedCollectionAddress}
              onValueChange={(value) => setSelectCollectionAddress(value)}
            >
              {data?.collections.map((collection, index) => (
                <RadioCards.Item
                  value={collection.contract.address}
                  key={collection.contract.address}
                >
                  <div className="w-full flex flex-row justify-start items-center gap-1 overflow-hidden ">
                    <Avatar
                      src={collection.image.thumbnailUrl}
                      fallback={collection?.name[0]}
                      radius="full"
                    />

                    <div className="overflow-hidden flex-auto ">
                      <div className="flex flex-row justify-between gap-1">
                        <p className="font-bold">{collection.name}</p>
                        <Badge color="blue">
                          {collection.numDistinctTokensOwned}
                        </Badge>
                      </div>
                      <Code>
                        {collection.contract.address.slice(0, 5)}...
                        {collection.contract.address.slice(-4)}
                      </Code>
                    </div>
                  </div>
                </RadioCards.Item>
              ))}
            </RadioCards.Root>
          </ScrollArea>
        </div>

        {/* <Grid columns={{ initial: "2", sm: "3" }} gap="3" width="auto"> */}

        {nftData ? (
          <NftTable
            nfts={nftData.ownedNfts}
            contract={nftData.ownedNfts[0].contract}
            mutateNfts={mutateNfts}
          />
        ) : (
          <div className="flex flex-col flex-auto">
            <span className="bg-gray-200 h-[30px] w-full rounded animate-pulse" />
            <hr className="my-3" />
            <span className="bg-gray-200 h-[40px] w-full rounded animate-pulse" />
            <hr className="my-3" />
            <span className="bg-gray-200 h-[40px] w-full rounded animate-pulse" />
            <hr className="my-3" />
            <span className="bg-gray-200 h-[40px] w-full rounded animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}
