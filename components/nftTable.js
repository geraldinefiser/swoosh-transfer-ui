import { Avatar } from "@radix-ui/themes";
import { Fragment, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { useMultiSelect } from "@/hooks/useMultiSelect";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import TransferDialog from "./transferDialog";

export default function NftTable({ nfts, contract, contractAddress }) {
  const { selectedArray: selectedNfts, handleCheck } = useMultiSelect(
    nfts.map((nft) => nft.id.tokenId)
  );
  console.log(nfts);

  return (
    <div className="flex flex-col flex-auto">
      <div className="flex flex-row justify-between items-center">
        <h3 className="text-lg font-bold mr-auto ">{contract.name}</h3>

        <TransferDialog
          contractAddress={contractAddress}
          selectedNfts={selectedNfts}
        />
      </div>
      <hr className="my-3" />
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
              src={nft.media[0].thumbnail ?? nft.media[0].gateway}
              fallback="T"
              className="select-none"
            />
            <p className="font-bold select-none">{nft.metadata.name}</p>
          </label>

          <hr className="my-3" />
        </Fragment>
      ))}
    </div>
  );
}
