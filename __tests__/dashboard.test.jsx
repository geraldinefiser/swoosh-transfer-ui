import { vi, describe, it, expect, beforeEach } from "vitest";
import { render } from "../test/test-utils";
import { screen, waitFor } from "@testing-library/react";
import Dashboard from "@/pages/dashboard";

import { useAccount } from "wagmi";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

vi.mock(import("wagmi"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAccount: vi.fn(),
  };
});

vi.mock("swr", () => {
  const useSWR = vi.fn();
  return { default: useSWR, useSWR };
});

// Mock swr/infinite
vi.mock("swr/infinite", () => {
  const useSWRInfinite = vi.fn();
  return { default: useSWRInfinite, useSWRInfinite };
});

vi.mock("../components/nav", () => ({
  default: () => <div data-testid="mock-nav">Mock Nav</div>,
}));

vi.mock("../components/nftTable", () => ({
  default: () => <div data-testid="mock-nft-table">Mock NFT Table</div>,
}));

vi.mock("../components/collectionList", () => ({
  default: () => (
    <div data-testid="mock-collection-list">Mock Collection List</div>
  ),
}));

vi.mock("../components/walletWithNoCollections", () => ({
  default: () => (
    <div data-testid="mock-wallet-no-collections">Mock No Collections</div>
  ),
}));

describe("Dashboard", () => {
  const mockAddress = "0x1234567890123456789012345678901234567890";

  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(useAccount).mockReturnValue({
      address: mockAddress,
    });
  });

  it("should renders the Nav component", () => {
    vi.mocked(useSWRInfinite).mockReturnValue([
      {
        data: undefined,
        size: 1,
        setSize: vi.fn(),
        isLoading: false,
      },
    ]);
    vi.mocked(useSWR).mockReturnValue({
      nftData: undefined,
      isLoading: false,
    });
    render(<Dashboard />);
    expect(screen.getByTestId("mock-nav")).toBeDefined();
  });

  it("renders the walletWithNoCollection  component when there are no collections", async () => {
    vi.mocked(useSWRInfinite).mockReturnValue({
      data: [
        {
          collections: [],
          totalCount: 0,
          pageKey: null,
        },
      ],
      size: 1,
      setSize: vi.fn(),
      isLoading: false,
    });
    vi.mocked(useSWR).mockReturnValue({
      nftData: null,
      isLoading: false,
    });

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByTestId("mock-wallet-no-collections")).toBeDefined();
    });
  });

  it("renders the collectionList component when wallet has collections and they are loaded", async () => {
    vi.mocked(useSWRInfinite).mockReturnValue({
      data: [
        {
          collections: [
            {
              contract: {
                address: "0x1234567890123456789012345678901234567890",
                name: "Scribbles",
              },
              name: "Scribbles",
            },
          ],
          totalCount: 1,
          pageKey: null,
        },
      ],
      size: 1,
      setSize: vi.fn(),
      isLoading: false,
    });
    vi.mocked(useSWR).mockReturnValue({
      nftData: null,
      isLoading: false,
    });
    render(<Dashboard />);
    await waitFor(() => {
      expect(screen.getByTestId("mock-collection-list")).toBeDefined();
    });
  });

  it("renders a placeholder if no collection selected and collections are loaded", async () => {
    vi.mocked(useSWRInfinite).mockReturnValue({
      data: [
        {
          collections: [
            {
              contract: {
                address: "0x1234567890123456789012345678901234567890",
                name: "Scribbles",
              },
              name: "Scribbles",
            },
          ],
          totalCount: 1,
          pageKey: null,
        },
      ],
      size: 1,
      setSize: vi.fn(),
      isLoading: false,
    });
    vi.mocked(useSWR).mockReturnValue({
      nftData: null,
      isLoading: false,
    });
    render(<Dashboard />);
    await waitFor(() => {
      expect(screen.getByTestId("mock-collection-list")).toBeDefined();
    });
  });
});
