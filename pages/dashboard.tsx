import Nav from "@/components/nav";
import NftTable from "@/components/nftTable";
import WalletWithNoCollections from "@/components/walletWithNoCollections";
import CollectionList from "@/components/collectionList";

import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { useEffect, useState } from "react";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { useAccount } from "wagmi";
import NftLoading from "@/components/nftLoading";

interface Contract {
  address: string;
  image: {
    thumbnailUrl: string;
  };
  name: string;
  numDistinctTokensOwned: string;
}
interface CollectionsData {
  contracts: Contract[];
  totalCount: number;
  pageKey: string;
}

interface Nft {
  tokenId: string;
  contract: string;
  name: string;
  image: {
    thumbnailUrl?: string;
    cachedUrl?: string;
  };
}

interface NftData {
  ownedNfts: Nft[];
}

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

  const { data, size, setSize, isLoading, error } =
    useSWRInfinite<CollectionsData>(getKey, fetcher, {
      focusThrottleInterval: 120000,
      dedupingInterval: 120000,
    });

  const [selectedCollectionAddress, setSelectCollectionAddress] = useState("");

  const {
    data: nftData,
    mutate: mutateNfts,
    isLoading: isNftLoading,
    error: nftError,
  } = useSWR<NftData>(
    address && selectedCollectionAddress
      ? `/api/fetch-nfts?for_address=${address}&for_collection=${selectedCollectionAddress}`
      : null,
    fetcher,
    { focusThrottleInterval: 120000, dedupingInterval: 120000 }
  );

  useEffect(() => {
    if (nftData?.ownedNfts?.length === 0) {
      setSelectCollectionAddress("");
    }
  }, [nftData?.ownedNfts]);

  const totalCount = data?.[data.length - 1]?.totalCount;
  const collectionsLoadedCount = data?.flatMap(
    (serie) => serie.contracts
  ).length;

  if (!data) {
    return (
      <div>
        <Nav />

        <div className="flex flex-row items-start gap-10 px-10">Loading</div>
      </div>
    );
  }

  if (data?.[0]?.contracts?.length === 0) {
    return <WalletWithNoCollections />;
  }

  if (data?.[0]?.error) {
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
            <div className="bg-orange-100/50 rounded w-full p-10 text-orange-500 ">
              <p className="font-bold mb-3">
                There was an error fetching your collections
              </p>
              <p>{data?.[0]?.error.message}</p>
            </div>
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
          <div className="relative flex flex-col items-start rounded mr-4 mb-3 p-4 bg-gray-100">
            <p className="font-bold">Collections in Wallet</p>

            <p className="text-sm">
              {collectionsLoadedCount} listed / {totalCount}
            </p>

            {totalCount > collectionsLoadedCount && (
              <button
                type="button"
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

          <CollectionList
            selectedCollectionAddress={selectedCollectionAddress}
            setSelectCollectionAddress={setSelectCollectionAddress}
            data={data}
          />
        </div>

        {!selectedCollectionAddress ? (
          <div className="flex flex-col gap-2 w-full">
            <div className="bg-blue-100/50 rounded w-full p-10 text-blue-500 ">
              <p>Select a collection to get started</p>
            </div>
          </div>
        ) : isNftLoading ? (
          <NftLoading />
        ) : nftData?.ownedNfts?.length > 0 ? (
          <NftTable
            nfts={nftData.ownedNfts}
            contract={nftData.ownedNfts[0].contract}
            mutateNfts={mutateNfts}
          />
        ) : null}
      </div>
    </div>
  );
}
