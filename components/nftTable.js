import { Avatar, Box, Checkbox, Flex, Separator, Text } from "@radix-ui/themes";
import { Fragment, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { useMultiSelect } from "@/hooks/useMultiSelect";

export default function NftTable({ nfts, contract }) {
  const { selectedArray: selectedNfts, handleCheck } = useMultiSelect(
    nfts.map((nft) => nft.id.tokenId)
  );

  return (
    <div className="flex flex-col flex-auto">
      <h3 className="text-lg font-bold">{contract.name}</h3>
      <Separator my="3" size="4" />
      {nfts.map((nft, index) => (
        <Fragment key={nft.id.tokenId}>
          <label
            key={nft.id.tokenId}
            className="flex flex-row gap-2 items-center"
          >
            <input
              type="checkbox"
              className="peer appearance-none"
              onClick={(e) => handleCheck(e, nft.id.tokenId)}
            />
            {selectedNfts.includes(nft.id.tokenId) ? (
              <div className="border border-blue-500 w-[15px] h-[15px] rounded select-none">
                <CheckIcon className="w-3 h-3 text-blue-500" />
              </div>
            ) : (
              <div className="border border-gray-400  w-[15px] h-[15px] rounded select-none">
                <CheckIcon className="w-3 h-3 text-transparent " />
              </div>
            )}

            <Avatar
              size="3"
              src={nft.media[0].thumbnail}
              fallback="T"
              className="select-none"
            />
            <p className="font-bold select-none">{nft.metadata.name}</p>
          </label>

          <Separator my="3" size="4" />
        </Fragment>
      ))}
    </div>
  );
}
