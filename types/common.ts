interface Nft {
  tokenId: string;
  contract: BaseContract;
  name: string;
  image: {
    thumbnailUrl?: string;
    cachedUrl?: string;
  };
}

interface BaseContract {
  address: string;
  name: string;
}

type Contract = {
  image: {
    thumbnailUrl: string;
  };
  name: string;
  numDistinctTokensOwned: string;
} & BaseContract;

type CollectionsData = {
  contracts: Contract[];
  totalCount: number;
  pageKey: string;
};
