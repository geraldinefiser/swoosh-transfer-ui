import { useEffect } from "react";
import { erc721Abi } from "viem";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

const BulkSendCA = "0xe141058cceb71a1c486987d2bfb18b5e1fd4d93f";

export function useApprovalStatus(userAddress, contractAddress) {
  const { data: isApproved, refetch } = useReadContract({
    abi: erc721Abi,
    address: contractAddress,
    functionName: "isApprovedForAll",
    args: [userAddress, BulkSendCA],
    query: { enabled: Boolean(userAddress) },
  });

  const { data, writeContract, isLoading: isWriteLoading } = useWriteContract();

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash: data,
  });

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, refetch]);

  // Status is equal to loading if isLoading is true, otherwise status is equal to approved if isApproved true or not-approved if isApproved is false
  const status =
    isLoading || isWriteLoading
      ? "loading"
      : isApproved
      ? "approved"
      : "not-approved";

  return { approvalStatus: status, writeApprovalContract: writeContract };
}
