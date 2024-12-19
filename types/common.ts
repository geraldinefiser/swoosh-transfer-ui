import type { Address } from "viem";

export type Nft = {
  tokenId: string;
  contract: BaseContract;
  name: string;
  image: {
    thumbnailUrl?: string;
    cachedUrl?: string;
  };
};

export type BaseContract = {
  address: Address;
  name: string;
};

export type Contract = {
  image: {
    thumbnailUrl: string;
  };
  numDistinctTokensOwned: string;
} & BaseContract;

export type CollectionsData = {
  contracts: Contract[];
  totalCount: number;
  pageKey: string;
};
