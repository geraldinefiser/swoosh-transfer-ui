import {
  InformationCircleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import bulkSend from "@/utils/BulkSend.json";

import { useRef, useState } from "react";
import { erc721Abi, isAddress } from "viem";
import { useAccount } from "wagmi";
import { Badge, Callout } from "@radix-ui/themes";
import { useApprovalStatus } from "@/hooks/useApprovalStatus";
import { useTransferStatus } from "@/hooks/useTransferStatus";

const BulkSendCA = "0xe141058cceb71a1c486987d2bfb18b5e1fd4d93f";

export default function TransferDialog({
  contractAddress,
  selectedNfts,
  mutateNfts,
}) {
  const [error, setError] = useState("");
  const receiver = useRef(null);
  const { address: userAddress } = useAccount();

  const { approvalStatus, writeApprovalContract } = useApprovalStatus(
    userAddress,
    contractAddress
  );

  const { writeStatus, writeContract } = useTransferStatus(mutateNfts);

  const handleTransfer = (e) => {
    e.preventDefault();
    const receiverAddress = receiver.current.value;

    if (approvalStatus !== "approved") {
      setError("You need to approve the contract first");
      return;
    }

    if (!isAddress(receiverAddress)) {
      receiver.current.value = "";
      receiver.current.focus();

      setError(
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

  return (
    <>
      {error && <div>{error}</div>}
      {(approvalStatus === "loading" || writeStatus === "loading") && (
        <div className="fixed top-1/4 right-2 md:right-5">
          <Callout.Root color="orange">
            <Callout.Icon>
              <InformationCircleIcon className="w-3 h-3 text-orange-600" />
            </Callout.Icon>
            <Callout.Text>Transaction is pending...</Callout.Text>
          </Callout.Root>
        </div>
      )}

      {writeStatus === "confirmed" && (
        <div className="fixed top-1/4 right-2 md:right-5">
          <Callout.Root color="green">
            <Callout.Icon>
              <InformationCircleIcon className="w-3 h-3 text-green-600" />
            </Callout.Icon>
            <Callout.Text>Transaction is successfull!</Callout.Text>
          </Callout.Root>
        </div>
      )}

      {approvalStatus === "approved" ? (
        <div className="md:mr-auto">
          <Badge color="blue">Contract Approved</Badge>
        </div>
      ) : (
        <button
          type="button"
          className={`ml-auto shrink-0 rounded-full py-2 px-5 mr-2 bg-orange-100 text-orange-500 ${
            approvalStatus === "loading" && "opacity-50 cursor-not-allowed"
          }`}
          disabled={approvalStatus === "loading"}
          onClick={(e) => {
            e.preventDefault();

            writeApprovalContract({
              abi: erc721Abi,
              address: contractAddress,
              functionName: "setApprovalForAll",
              args: [BulkSendCA, true],
            });
          }}
        >
          <>
            {writeStatus === "loading" && (
              <span>Waiting for confirmation...</span>
            )}

            {writeStatus === "confirmed" && <span>Transaction confirmed.</span>}
            {writeStatus === "idle" && <span>Approve contract</span>}
          </>
        </button>
      )}

      <form
        onSubmit={(e) => handleTransfer(e)}
        className={`flex flex-row bg-blue-50 rounded-full px-1 py-1 ${
          (approvalStatus !== "approved" || writeStatus === "loading") &&
          "opacity-50 cursor-not-allowed"
        }`}
      >
        <input
          required
          ref={receiver}
          type="text"
          name="receiver"
          placeholder="wallet addy"
          className="bg-transparent pl-3 outline-none font-mono text-sm"
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
