import { useEffect } from "react";
import { type Address, erc721Abi } from "viem";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

const BulkSendCA: Address = "0xe141058cceb71a1c486987d2bfb18b5e1fd4d93f";

export function useApprovalStatus(
  userAddress: Address | undefined,
  contractAddress: Address
) {
  const args: Readonly<[Address, Address]> | undefined = userAddress
    ? [userAddress, BulkSendCA]
    : undefined;

  const { data: isApproved, refetch } = useReadContract({
    abi: erc721Abi,
    address: contractAddress,
    functionName: "isApprovedForAll",
    args: args,
    query: { enabled: Boolean(userAddress) },
  });

  const { data, writeContract, isPending: isWriteLoading } = useWriteContract();

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash: data,
  });

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, refetch]);

  const getStatus = (): "loading" | "approved" | "not-approved" => {
    if (isLoading || isWriteLoading) return "loading";
    if (isApproved) return "approved";
    return "not-approved";
  };
  const status = getStatus();

  return { approvalStatus: status, writeApprovalContract: writeContract };
}
