export const setupNFTApiMocks = () => {
  const collectionName = "ZKFAIR AIRDROP";
  const collectionAddress = "0x0e11d8d829989085eED704295c4d3269746760eb";
  const numberNftOwned = "1";
  const collectionsByOwner = {
    contracts: [
      {
        address: collectionAddress,
        name: collectionName,
        symbol: "ZKFAIR",
        totalSupply: null,
        tokenType: "ERC721",
        contractDeployer: null,
        deployedBlockNumber: null,
        openSeaMetadata: {
          floorPrice: null,
          collectionName: null,
          collectionSlug: null,
          safelistRequestStatus: null,
          imageUrl: null,
          description: null,
          externalUrl: null,
          twitterUsername: null,
          discordUrl: null,
          bannerImageUrl: null,
          lastIngestedAt: null,
        },
        totalBalance: "1",
        numDistinctTokensOwned: numberNftOwned,
        isSpam: false,
        displayNft: {
          tokenId: "9772",
          name: "ZKFAIR AIRDROP #9772",
        },
        image: {
          cachedUrl:
            "https://nft-cdn.alchemy.com/avax-mainnet/4db758bfb87ab33b8ecbe0084f4523b6",
          thumbnailUrl:
            "https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/avax-mainnet/4db758bfb87ab33b8ecbe0084f4523b6",
          pngUrl:
            "https://res.cloudinary.com/alchemyapi/image/upload/convert-png/avax-mainnet/4db758bfb87ab33b8ecbe0084f4523b6",
          contentType: "image/png",
          size: 732318,
          originalUrl:
            "https://bafybeidbmyzechutwqfa372ybfzmbycl2adtgdf6e3jlbh2ihrktobi6ae.ipfs.nftstorage.link/Frame%2022%20(1).png",
        },
      },
      {
        address: "0xd2bc8f9eAa96093b198B561afF05E0e14C171074",
        name: "Tytooche",
        symbol: "Tytooche",
        totalSupply: null,
        tokenType: "ERC1155",
        contractDeployer: null,
        deployedBlockNumber: null,
        openSeaMetadata: {
          floorPrice: null,
          collectionName: null,
          collectionSlug: null,
          safelistRequestStatus: null,
          imageUrl: null,
          description: null,
          externalUrl: null,
          twitterUsername: null,
          discordUrl: null,
          bannerImageUrl: null,
          lastIngestedAt: null,
        },
        totalBalance: "1",
        numDistinctTokensOwned: "1",
        isSpam: false,
        displayNft: {
          tokenId: "50",
          name: "Tytooche #50",
        },
        image: {
          cachedUrl:
            "https://nft-cdn.alchemy.com/avax-mainnet/de2c627a49b15a991587683bc226c936",
          thumbnailUrl:
            "https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/avax-mainnet/de2c627a49b15a991587683bc226c936",
          pngUrl:
            "https://res.cloudinary.com/alchemyapi/image/upload/convert-png/avax-mainnet/de2c627a49b15a991587683bc226c936",
          contentType: "image/png",
          size: 1265781,
          originalUrl:
            "https://ipfs.io/ipfs/bafybeihiec5gscqhrarnqrwc4nxasd75pktnm73y3dehtv3q3vtuyee7pm/50",
        },
      },
      {
        address: "0xe517EfD2D07eF8D9Fc5E8C17683C1762DdCf579c",
        name: "Dropys",
        symbol: "Dropys",
        totalSupply: "8",
        tokenType: "ERC721",
        contractDeployer: null,
        deployedBlockNumber: null,
        openSeaMetadata: {
          floorPrice: null,
          collectionName: null,
          collectionSlug: null,
          safelistRequestStatus: null,
          imageUrl: null,
          description: null,
          externalUrl: null,
          twitterUsername: null,
          discordUrl: null,
          bannerImageUrl: null,
          lastIngestedAt: null,
        },
        totalBalance: "1",
        numDistinctTokensOwned: "1",
        isSpam: false,
        displayNft: {
          tokenId: "1",
          name: "Dropys",
        },
        image: {
          cachedUrl:
            "https://ipfs.io/ipfs/bafybeifl4slvkafw667wxdnvblnexzrf5xafupysiiw6qjp7zxzhxol3wm/unicorn.png",
          thumbnailUrl: null,
          pngUrl: null,
          contentType: null,
          size: null,
          originalUrl:
            "https://ipfs.io/ipfs/bafybeifl4slvkafw667wxdnvblnexzrf5xafupysiiw6qjp7zxzhxol3wm/unicorn.png",
        },
      },
    ],
    totalCount: 3,
    pageKey: null,
  };

  const nftsByOwnerForContract = {
    ownedNfts: [
      {
        contract: {
          address: collectionAddress,
          name: collectionName,
          symbol: "ZKFAIR",
          totalSupply: null,
          tokenType: "ERC721",
          contractDeployer: null,
          deployedBlockNumber: null,
          openSeaMetadata: {
            floorPrice: null,
            collectionName: null,
            collectionSlug: null,
            safelistRequestStatus: null,
            imageUrl: null,
            description: null,
            externalUrl: null,
            twitterUsername: null,
            discordUrl: null,
            bannerImageUrl: null,
            lastIngestedAt: null,
          },
          isSpam: null,
          spamClassifications: [],
        },
        tokenId: "9772",
        tokenType: "ERC721",
        name: "ZKFAIR AIRDROP #9772",
        description:
          "Biggest ZKFAIR airdrop. Event 2024, claim your reward on out event site",
        tokenUri:
          "https://alchemy.mypinata.cloud/ipfs/bafybeiazbhameifog4egwuru7cmbzy434khbypndypvsylvf52g5lu6ig4/9772",
        image: {
          cachedUrl:
            "https://nft-cdn.alchemy.com/avax-mainnet/4db758bfb87ab33b8ecbe0084f4523b6",
          thumbnailUrl:
            "https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/avax-mainnet/4db758bfb87ab33b8ecbe0084f4523b6",
          pngUrl:
            "https://res.cloudinary.com/alchemyapi/image/upload/convert-png/avax-mainnet/4db758bfb87ab33b8ecbe0084f4523b6",
          contentType: "image/png",
          size: 732318,
          originalUrl:
            "https://bafybeidbmyzechutwqfa372ybfzmbycl2adtgdf6e3jlbh2ihrktobi6ae.ipfs.nftstorage.link/Frame%2022%20(1).png",
        },
        raw: {
          tokenUri:
            "https://nftstorage.link/ipfs/bafybeiazbhameifog4egwuru7cmbzy434khbypndypvsylvf52g5lu6ig4/9772",
          metadata: {
            name: "ZKFAIR AIRDROP #9772",
            description:
              "Biggest ZKFAIR airdrop. Event 2024, claim your reward on out event site",
            image:
              "https://bafybeidbmyzechutwqfa372ybfzmbycl2adtgdf6e3jlbh2ihrktobi6ae.ipfs.nftstorage.link/Frame%2022%20(1).png",
            attributes: [],
          },
          error: null,
        },
        collection: null,
        mint: {
          mintAddress: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
          blockNumber: 41490137,
          timestamp: "2024-02-10T10:16:58Z",
          transactionHash:
            "0x5f4442b4d2bceebd2d346aa038e2b6dec6023f50560ebcead4ba48ba3f98ef90",
        },
        owners: null,
        timeLastUpdated: "2024-11-17T20:19:30.032Z",
        balance: "1",
        acquiredAt: {
          blockTimestamp: null,
          blockNumber: null,
        },
      },
      {
        contract: {
          address: "0xd2bc8f9eAa96093b198B561afF05E0e14C171074",
          name: "Tytooche",
          symbol: "Tytooche",
          totalSupply: null,
          tokenType: "ERC1155",
          contractDeployer: null,
          deployedBlockNumber: null,
          openSeaMetadata: {
            floorPrice: null,
            collectionName: null,
            collectionSlug: null,
            safelistRequestStatus: null,
            imageUrl: null,
            description: null,
            externalUrl: null,
            twitterUsername: null,
            discordUrl: null,
            bannerImageUrl: null,
            lastIngestedAt: null,
          },
          isSpam: null,
          spamClassifications: [],
        },
        tokenId: "50",
        tokenType: "ERC1155",
        name: "Tytooche #50",
        description:
          "This exceptional collection is a limited edition. It consists of rare and distinctive tokenized digital assets using blockchain technology, offering future benefits through these NFTs. The buyer will then be able to benefit from copyright rights and exploit the work in question.",
        tokenUri:
          "https://alchemy.mypinata.cloud/ipfs/bafybeifltcyat2niigw2m5bynai6vhprvek3mw62bnkrkyvqoldjkeehpa/0000000000000000000000000000000000000000000000000000000000000032",
        image: {
          cachedUrl:
            "https://nft-cdn.alchemy.com/avax-mainnet/de2c627a49b15a991587683bc226c936",
          thumbnailUrl:
            "https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/avax-mainnet/de2c627a49b15a991587683bc226c936",
          pngUrl:
            "https://res.cloudinary.com/alchemyapi/image/upload/convert-png/avax-mainnet/de2c627a49b15a991587683bc226c936",
          contentType: "image/png",
          size: 1265781,
          originalUrl:
            "https://ipfs.io/ipfs/bafybeihiec5gscqhrarnqrwc4nxasd75pktnm73y3dehtv3q3vtuyee7pm/50",
        },
        raw: {
          tokenUri:
            "ipfs://bafybeifltcyat2niigw2m5bynai6vhprvek3mw62bnkrkyvqoldjkeehpa/{id}",
          metadata: {
            name: "Tytooche #50",
            description:
              "This exceptional collection is a limited edition. It consists of rare and distinctive tokenized digital assets using blockchain technology, offering future benefits through these NFTs. The buyer will then be able to benefit from copyright rights and exploit the work in question.",
            image:
              "ipfs://bafybeihiec5gscqhrarnqrwc4nxasd75pktnm73y3dehtv3q3vtuyee7pm/50",
            external_url: "tytooche.com",
          },
          error: null,
        },
        collection: null,
        mint: {
          mintAddress: "0x8b243e23755d9989006aa30aa2e326bd795449de",
          blockNumber: 47990364,
          timestamp: "2024-07-15T07:50:25Z",
          transactionHash:
            "0x79297fb5c3864c0d25189ee6cb510ba3feb325fb6a3e97540fc27930d9103a29",
        },
        owners: null,
        timeLastUpdated: "2024-11-17T20:19:30.447Z",
        balance: "1",
        acquiredAt: {
          blockTimestamp: null,
          blockNumber: null,
        },
      },
      {
        contract: {
          address: "0xe517EfD2D07eF8D9Fc5E8C17683C1762DdCf579c",
          name: "Dropys",
          symbol: "Dropys",
          totalSupply: "8",
          tokenType: "ERC721",
          contractDeployer: null,
          deployedBlockNumber: null,
          openSeaMetadata: {
            floorPrice: null,
            collectionName: null,
            collectionSlug: null,
            safelistRequestStatus: null,
            imageUrl: null,
            description: null,
            externalUrl: null,
            twitterUsername: null,
            discordUrl: null,
            bannerImageUrl: null,
            lastIngestedAt: null,
          },
          isSpam: null,
          spamClassifications: [],
        },
        tokenId: "1",
        tokenType: "ERC721",
        name: "Dropys",
        description: null,
        tokenUri:
          "https://alchemy.mypinata.cloud/ipfs/bafyreibiuzdl26arrvgybvyiq3abl53bl5s3dpkyiqkujbwy5e3a3mzqoq/metadata.json",
        image: {
          cachedUrl:
            "https://ipfs.io/ipfs/bafybeifl4slvkafw667wxdnvblnexzrf5xafupysiiw6qjp7zxzhxol3wm/unicorn.png",
          thumbnailUrl: null,
          pngUrl: null,
          contentType: null,
          size: null,
          originalUrl:
            "https://ipfs.io/ipfs/bafybeifl4slvkafw667wxdnvblnexzrf5xafupysiiw6qjp7zxzhxol3wm/unicorn.png",
        },
        raw: {
          tokenUri:
            "ipfs://bafyreibiuzdl26arrvgybvyiq3abl53bl5s3dpkyiqkujbwy5e3a3mzqoq/metadata.json",
          metadata: {
            name: "Dropys",
            description: "",
            image:
              "ipfs://bafybeifl4slvkafw667wxdnvblnexzrf5xafupysiiw6qjp7zxzhxol3wm/unicorn.png",
            external_url: "",
            animation_url:
              "ipfs://bafybeifl4slvkafw667wxdnvblnexzrf5xafupysiiw6qjp7zxzhxol3wm/unicorn.png",
          },
          error: null,
        },
        collection: null,
        mint: {
          mintAddress: null,
          blockNumber: null,
          timestamp: null,
          transactionHash: null,
        },
        owners: null,
        timeLastUpdated: "2024-12-12T06:44:46.400Z",
        balance: "1",
        acquiredAt: {
          blockTimestamp: null,
          blockNumber: null,
        },
      },
    ],
    totalCount: 3,
    validAt: {
      blockNumber: 54479458,
      blockHash:
        "0x12c63b7d1bdd99af9c1d9783b8d5e327e0328493a3dbf69a6aee7b702372ae11",
      blockTimestamp: "2024-12-17T18:40:52Z",
    },
    pageKey: null,
  };

  return {
    collectionsByOwner,
    collectionName,
    collectionAddress,
    nftsByOwnerForContract,
    numberNftOwned,
  };
};
