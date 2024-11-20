import {
  InformationCircleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import bulkSend from "@/utils/BulkSend.json";

import { useEffect, useRef } from "react";
import { erc721Abi, isAddress } from "viem";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Badge, Callout } from "@radix-ui/themes";

const BulkSendCA = "0xe141058cceb71a1c486987d2bfb18b5e1fd4d93f";

export default function TransferDialog({
  contractAddress,
  selectedNfts,
  mutateNfts,
}) {
  const receiver = useRef(null);
  const { address: userAddress } = useAccount();

  const { data: isApproved, refetch } = useReadContract({
    abi: erc721Abi,
    address: contractAddress,
    functionName: "isApprovedForAll",
    args: [userAddress, BulkSendCA],
    query: { enabled: Boolean(userAddress) },
  });

  const {
    data: ApprovalHash,
    writeApprovalContract,
    isApprovalPending,
  } = useWriteContract();

  const { isLoading: isApprovalConfirming, isSuccess: isApprovalConfirmed } =
    useWaitForTransactionReceipt({
      ApprovalHash,
    });

  const { data: hash, writeContract, isPending, reset } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleTransfer = (e) => {
    e.preventDefault();
    const receiverAddress = receiver.current.value;
    console.log("RA", receiverAddress);
    if (!isApproved) {
      alert("You need to approve the contract first");
      return;
    }
    console.log("RA", isAddress(receiverAddress));
    if (!isAddress(receiverAddress)) {
      receiver.current.value = "";
      receiver.current.focus();
      alert(
        "The receiver wallet address is not a valid address. Make sure you copied the correct address."
      );
      return;
    }

    writeContract({
      address: BulkSendCA,
      abi: bulkSend,
      functionName: "bulkSend",
      args: [[contractAddress], receiverAddress, [selectedNfts]],
    });
  };

  useEffect(() => {
    if (isApprovalConfirmed) {
      refetch();
    }
  }, [isApprovalConfirmed, refetch]);

  useEffect(() => {
    if (isConfirmed) {
      mutateNfts();
      setTimeout(() => {
        reset();
      }, 5000);
    }
  }, [isConfirmed, mutateNfts, reset]);

  return (
    <>
      {(isApprovalPending ||
        isApprovalConfirming ||
        isPending ||
        isConfirming) && (
        <div className="fixed top-1/4 right-2 md:right-5">
          <Callout.Root color="orange">
            <Callout.Icon>
              <InformationCircleIcon className="w-3 h-3 text-orange-600" />
            </Callout.Icon>
            <Callout.Text>
              Transaction is{" "}
              {isApprovalPending || isPending ? "pending" : "confirming"}...
            </Callout.Text>
          </Callout.Root>
        </div>
      )}
      {isConfirmed && (
        <div className="fixed top-1/4 right-2 md:right-5">
          <Callout.Root color="green">
            <Callout.Icon>
              <InformationCircleIcon className="w-3 h-3 text-green-600" />
            </Callout.Icon>
            <Callout.Text>Transaction is successfull!</Callout.Text>
          </Callout.Root>
        </div>
      )}

      {isApproved ? (
        <div className="md:mr-auto">
          <Badge color="blue">Contract Approved</Badge>
        </div>
      ) : (
        <button
          type="button"
          className="ml-auto rounded-full py-2 px-5 mr-2 bg-orange-100 text-orange-500"
          onClick={(e) => {
            e.preventDefault();
            writeApprovalContract({
              abi: erc721Abi,
              contractAddress: contractAddress,
              functionName: "setApprovalForAll",
              args: [BulkSendCA, true],
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
        className={`flex flex-row bg-blue-50 rounded-full px-1 py-1 ${
          !isApproved && "opacity-50 cursor-not-allowed"
        }`}
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
