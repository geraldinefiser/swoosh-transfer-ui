import { useEffect } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

export function useTransferStatus(mutateNfts: () => void) {
  const { data: hash, writeContract, isPending, reset } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isSuccess) {
      mutateNfts();

      function timeout() {
        timeoutId = setTimeout(() => {
          reset();
        }, 5000);
      }

      timeout();
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isSuccess, mutateNfts, reset]);

  const getStatus = (): "loading" | "confirmed" | "idle" => {
    if (isPending || isConfirming) return "loading";
    if (isSuccess) return "confirmed";
    return "idle";
  };

  const writeStatus = getStatus();

  return { writeStatus, writeContract };
}
