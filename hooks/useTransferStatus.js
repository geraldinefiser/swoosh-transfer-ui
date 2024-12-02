import { useEffect } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

export function useTransferStatus(mutateNfts) {
  const { data: hash, writeContract, isPending, reset } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    let timeoutId;
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

  const writeStatus =
    isPending || isConfirming ? "loading" : isSuccess ? "confirmed" : "idle";

  return { writeStatus: writeStatus, writeContract };
}
