import DefaultHomeComponent from "@/components/walletWithNoCollections";
import Nav from "@/components/nav";
import NftTable from "@/components/nftTable";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Avatar, RadioCards, Badge, Code, ScrollArea } from "@radix-ui/themes";

import { useEffect, useState } from "react";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { useAccount } from "wagmi";
import WalletWithNoCollections from "@/components/walletWithNoCollections";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Dashboard() {
  const { address } = useAccount();

  const getKey = (pageIndex, previousPageData) => {
    if (!address) return null;

    // reached the end
    if (previousPageData && !previousPageData.pageKey) return null;

    // first page, we don't have `previousPageData`
    if (pageIndex === 0) return `/api/fetch-collections?for_address=${address}`;

    // add the cursor to the API endpoint
    return `/api/fetch-collections?for_address=${address}&pageKey=${previousPageData.pageKey}`;
  };

  const { data, size, setSize, isLoading } = useSWRInfinite(getKey, fetcher, {
    focusThrottleInterval: 120000,
    dedupingInterval: 120000,
  });

  const [selectedCollectionAddress, setSelectCollectionAddress] = useState();

  const { data: nftData, mutate: mutateNfts } = useSWR(
    address && selectedCollectionAddress
      ? `/api/fetch-nfts?for_address=${address}&for_collection=${selectedCollectionAddress}`
      : null,
    fetcher,
    { focusThrottleInterval: 120000, dedupingInterval: 120000 }
  );

  useEffect(() => {
    if (data?.collections?.length > 0 && !selectedCollectionAddress) {
      setSelectCollectionAddress(data.collections[0].contract.address);
    }
  }, [data, selectedCollectionAddress]);

  const totalCount = data?.[data.length - 1].totalCount;
  const collectionsLoadedCount = data?.flatMap(
    (serie) => serie.collections
  ).length;

  if (data?.collections?.length === 0) {
    return <WalletWithNoCollections />;
  }

  return (
    <div>
      <Nav />

      <div className="flex flex-row items-start gap-10 px-10">
        <div className="flex flex-col w-[300px] h-[calc(100vh_-_80px)]">
          <div className="relative flex flex-col items-start rounded mr-4 mb-3 p-4 bg-gray-100">
            <p className="font-bold">Collections in Wallet</p>

            <p className="text-sm">
              {collectionsLoadedCount} listed / {totalCount}
            </p>

            {totalCount > collectionsLoadedCount && (
              <button
                disabled={isLoading}
                onClick={() => setSize(size + 1)}
                className="absolute bottom-4 right-4 bg-blue-500 text-white px-2 text-xs py-1 rounded"
              >
                Load more
              </button>
            )}
          </div>

          <div className="relative flex flex-row items-center border border-gray-300 rounded mr-4 mb-3">
            <MagnifyingGlassIcon className=" w-4 h-4 absolute top-4 left-4 text-gray-500" />
            <input
              className="pl-12 bg-transparent h-[50px] w-full"
              type="text"
              placeholder="Search collections..."
            />
          </div>

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
              {data
                ?.flatMap((serie) => serie.collections)
                .map((collection, index) => (
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
