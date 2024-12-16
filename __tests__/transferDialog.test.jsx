import { describe, it, vi, expect, beforeEach } from "vitest";
import { render } from "../test/test-utils";
import { fireEvent, screen, waitFor } from "@testing-library/react";

import { useAccount } from "wagmi";
import { useApprovalStatus } from "@/hooks/useApprovalStatus";
import { useTransferStatus } from "@/hooks/useTransferStatus";

import TransferDialog from "@/components/transferDialog";
vi.mock(import("wagmi"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAccount: vi.fn(),
  };
});
vi.mock("@/hooks/useApprovalStatus", () => ({
  useApprovalStatus: vi.fn(),
}));

vi.mock("@/hooks/useTransferStatus", () => ({
  useTransferStatus: vi.fn(),
}));

vi.mock("viem", () => ({
  isAddress: vi.fn(),
  erc721Abi: {},
}));
describe("Transfer Form", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAccount).mockReturnValue({ address: "0x1234" });
    vi.mocked(useApprovalStatus).mockReturnValue({
      approvalStatus: "approved",
      writeApprovalContract: vi.fn(),
    });
    vi.mocked(useTransferStatus).mockReturnValue({
      writeStatus: "idle",
      writeContract: vi.fn(),
    });
  });

  const mockProps = {
    contractAddress: "0x123456789",
    selectedNfts: [
      { tokenId: 1, name: "token 1" },
      { tokenId: 2, name: "token 2" },
    ],
    mutateNfts: vi.fn(),
  };

  it("renders the form with the wallet addy field and the tx btn", () => {
    render(<TransferDialog {...mockProps} />);

    const button = screen.getByRole("button", { name: /transfer/i });
    const input = screen.getByPlaceholderText("wallet addy");
    expect(button).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it("disables the submit button if no NFTs are selected", () => {
    render(<TransferDialog {...mockProps} selectedNfts={[]} />);

    const button = screen.getByRole("button", { name: /transfer/i });
    expect(button).toBeDisabled();
  });

  it("shows an error if the receiver address is invalid", async () => {
    render(<TransferDialog {...mockProps} />);

    const button = screen.getByRole("button", { name: /transfer/i });
    const input = screen.getByPlaceholderText("wallet addy");

    fireEvent.change(input, { target: { value: "notanaddress" } });
    fireEvent.submit(button.closest("form"));

    await waitFor(() => {
      expect(
        screen.getByText(
          /The receiver wallet address is not a valid address. Make sure you copied the correct address./i
        )
      ).toBeInTheDocument();
    });
  });
});
