import { Avatar } from "@radix-ui/themes";
import { Fragment } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { useMultiSelect } from "@/hooks/useMultiSelect";
import TransferDialog from "./transferDialog";
import type { Nft } from "@/types/common";

interface TableProps {
  nfts: Nft[];
  mutateNfts: () => void;
}

export default function NftTable({ nfts, mutateNfts }: TableProps) {
  const contract = nfts[0].contract;
  const { selectedArray: selectedNfts, handleCheck } = useMultiSelect(
    nfts.map((nft) => nft.tokenId)
  );

  return (
    <div className="flex flex-col flex-auto">
      <div className="flex flex-col md:flex-row gap-2 justify-start items-center">
        <h3 className="text-lg font-bold ">{contract.name}</h3>

        <TransferDialog
          contractAddress={contract.address}
          selectedNfts={selectedNfts}
          mutateNfts={mutateNfts}
        />
      </div>
      <hr className="my-3" />
      {nfts.map((nft) => (
        <Fragment key={nft.tokenId}>
          <label className="flex flex-row gap-2 items-center">
            <input
              type="checkbox"
              className="peer appearance-none"
              onClick={(e) => handleCheck(e, nft.tokenId)}
            />
            {selectedNfts.includes(nft.tokenId) ? (
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
              src={nft.image.thumbnailUrl ?? nft.image.cachedUrl}
              fallback="T"
              className="select-none"
            />
            <p className="font-bold select-none">{nft.name}</p>
          </label>

          <hr className="my-3" />
        </Fragment>
      ))}
    </div>
  );
}
