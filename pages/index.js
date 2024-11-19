import NftTable from "@/components/nftTable";
import {
  Avatar,
  RadioCards,
  Badge,
  Code,
  ScrollArea,
  Separator,
  Skeleton,
  Flex,
  Text,
} from "@radix-ui/themes";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import useSWR from "swr";
import { useAccount } from "wagmi";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { address } = useAccount();

  const { data } = useSWR(
    address ? `/api/fetch-collections?for_address=${address}` : null,
    fetcher,
    { focusThrottleInterval: 3600000 }
  );

  const [selectedCollectionAddress, setSelectCollectionAddress] = useState(
    data?.collections[0].contract.address
  );

  const { data: nftData } = useSWR(
    address && selectedCollectionAddress
      ? `/api/fetch-nfts?for_address=${address}&for_collection=${selectedCollectionAddress}`
      : null,
    fetcher,
    { focusThrottleInterval: 3600000 }
  );
  console.log(nftData);

  return (
    <div>
      <div className="h-[50px] flex flex-row justify-end py-5">
        <ConnectButton />
      </div>

      <div className="px-5 flex flex-row  gap-5 h-[calc(100vh_-_70px)] ">
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

        {/* <Grid columns={{ initial: "2", sm: "3" }} gap="3" width="auto"> */}

        {nftData ? (
          <NftTable
            nfts={nftData.ownedNfts}
            contract={nftData.ownedNfts[0].contractMetadata}
          />
        ) : (
          <div className="flex flex-col gap-2 flex-auto">
            <span className="bg-gray-200 h-[35px] w-full rounded animate-pulse" />
            <span className="bg-gray-200 h-[25px] w-full rounded animate-pulse" />
            <span className="bg-gray-200 h-[25px] w-full rounded animate-pulse" />
            <span className="bg-gray-200 h-[25px] w-full rounded animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}
