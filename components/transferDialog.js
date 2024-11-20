import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

import { useRef } from "react";
import { erc721Abi, isAddress } from "viem";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

const BulkSendContractAddress = "0xe141058cceb71a1c486987d2bfb18b5e1fd4d93f";
export default function TransferDialog({ contractAddress, selectedNfts }) {
  const receiver = useRef(null);
  const { address: userAddress } = useAccount();

  const {
    data: isApproved,
    isError,
    isFetched,
  } = useReadContract({
    abi: erc721Abi,
    address: contractAddress,
    functionName: "isApprovedForAll",
    args: [userAddress, BulkSendContractAddress],
    query: { enabled: Boolean(userAddress) },
  });

  const {
    data: approvalHash,
    writeContract,
    isPending,
    isError: isWriteError,
    error: writeError,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      approvalHash,
    });
  const validateAddress = (address) => {
    isAddress(address);
  };

  const handleTransfer = (e) => {
    e.preventDefault();
    if (!isApproved) {
      alert("You need to approve the contract first");
      return;
    }
    if (!validateAddress(receiver)) {
      receiver.current.value = "";
      receiver.current.focus();
      alert(
        "The receiver wallet address is not a valid address. Make sure you copied the correct address."
      );
      return;
    }
  };

  return (
    <>
      {isApproved ? (
        <span>All good</span>
      ) : (
        <button
          type="button"
          className="rounded-full py-1 px-5 bg-blue-100 text-blue-500"
          onClick={(e) => {
            e.preventDefault();
            writeContract({
              abi: erc721Abi,
              contractAddress: contractAddress,
              functionName: "setApprovalForAll",
              args: [BulkSendContractAddress, true],
            });
          }}
        >
          {isPending ? (
            "Confirming..."
          ) : (
            <>
              {isConfirming && <span>Waiting for confirmation...</span>}
              {isConfirmed && <span>Transaction confirmed.</span>}
              {!isConfirming && !isConfirmed && <span>Approve contract</span>}
            </>
          )}
        </button>
      )}

      <form
        onSubmit={(e) => handleTransfer(e)}
        className="flex flex-row bg-blue-50 rounded-full px-1 py-1"
      >
        <input
          required
          ref={receiver}
          type="text"
          name="receiver"
          placeholder="wallet addy"
          className="bg-transparent pl-3 outline-none"
        />

        <button
          type="submit"
          disabled={selectedNfts.length === 0}
          className={`rounded-full py-1 px-5 bg-blue-100 text-blue-500 flex flex-row items-center gap-1 ${
            selectedNfts.length === 0 && "cursor-not-allowed"
          }`}
        >
          <PaperAirplaneIcon className="w-4 h-4 -rotate-45" /> Transfer
        </button>
      </form>
    </>
  );
}
