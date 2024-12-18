import { vi, describe, it, expect, beforeEach } from "vitest";
import { render } from "../test/test-utils";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import Dashboard from "@/pages/dashboard";

import { useAccount } from "wagmi";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { setupNFTApiMocks } from "@/test/nft-api-mock";

const {
  collectionsByOwner,
  nftsByOwnerForContract,
  collectionAddress,
  collectionName,
  numberNftOwned,
} = setupNFTApiMocks();

const buttonName = `${collectionName} ${numberNftOwned} ${collectionAddress.slice(
  0,
  5
)}...${collectionAddress.slice(-4)}`;

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

vi.mock("../components/nftLoading", () => ({
  default: () => <div data-testid="mock-nft-loading">Mock NFT Loading</div>,
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
    vi.mocked(useSWRInfinite).mockReturnValue({
      data: undefined,
      size: 1,
      setSize: vi.fn(),
      isLoading: false,
    });
    vi.mocked(useSWR).mockReturnValue({
      data: undefined,
      isLoading: false,
    });
    render(<Dashboard />);
    expect(screen.getByTestId("mock-nav")).toBeDefined();
  });

  it("renders the walletWithNoCollection  component when there are no collections", async () => {
    vi.mocked(useSWRInfinite).mockReturnValue({
      data: [
        {
          contracts: [],
          totalCount: 0,
          pageKey: null,
        },
      ],
      size: 1,
      setSize: vi.fn(),
      isLoading: false,
    });
    vi.mocked(useSWR).mockReturnValue({
      data: undefined,
      isLoading: false,
    });

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByTestId("mock-wallet-no-collections")).toBeDefined();
    });
  });

  it("renders the collectionList component when wallet has collections and they are loaded", async () => {
    vi.mocked(useSWRInfinite).mockReturnValue({
      data: [collectionsByOwner],
      size: 1,
      setSize: vi.fn(),
      isLoading: false,
    });
    vi.mocked(useSWR).mockReturnValue({
      data: null,
      isLoading: false,
    });
    render(<Dashboard />);

    await waitFor(() => {
      expect(
        screen.getByRole("radio", {
          name: buttonName,
        })
      ).toBeInTheDocument();
    });
  });

  it("renders a placeholder if no collection selected and collections are loaded", async () => {
    vi.mocked(useSWRInfinite).mockReturnValue({
      data: [collectionsByOwner],
      size: 1,
      setSize: vi.fn(),
      isLoading: false,
    });
    vi.mocked(useSWR).mockReturnValue({
      data: undefined,
      isLoading: false,
    });
    render(<Dashboard />);
    await waitFor(() => {
      expect(
        screen.getByRole("radio", {
          name: buttonName,
        })
      ).toBeInTheDocument();

      expect(
        screen.getByText("Select a collection to get started")
      ).toBeDefined();
    });
  });

  it("renders the NFT Table when a collection is selected and NFTs are loaded", async () => {
    vi.mocked(useSWRInfinite).mockReturnValue({
      data: [collectionsByOwner],
      size: 1,
      setSize: vi.fn(),
      isLoading: false,
    });

    vi.mocked(useSWR).mockReturnValue({
      data: nftsByOwnerForContract,
      isLoading: false,
    });

    render(<Dashboard />);

    expect(
      screen.getByText("Select a collection to get started")
    ).toBeDefined();

    const button = screen.getByRole("radio", {
      name: buttonName,
    });
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.queryByText("Select a collection to get started")
      ).not.toBeInTheDocument();
      expect(screen.getByTestId("mock-nft-table")).toBeDefined();
    });
  });

  it("renders a loading skeleton when a collection is selected and NFTs are loading", async () => {
    vi.mocked(useSWRInfinite).mockReturnValue({
      data: [collectionsByOwner],
      size: 1,
      setSize: vi.fn(),
      isLoading: false,
    });

    vi.mocked(useSWR).mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    render(<Dashboard />);

    expect(
      screen.getByText("Select a collection to get started")
    ).toBeDefined();

    const button = screen.getByRole("radio", { name: buttonName });
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.queryByText("Select a collection to get started")
      ).not.toBeInTheDocument();
      expect(screen.getByTestId("mock-nft-loading")).toBeDefined();
    });
  });

  it("does not show load more button if all collections have been fetched", async () => {
    vi.mocked(useSWRInfinite).mockReturnValue({
      data: [collectionsByOwner],
      size: 1,
      setSize: vi.fn(),
      isLoading: false,
    });
    vi.mocked(useSWR).mockReturnValue({
      data: undefined,
      isLoading: false,
    });
    render(<Dashboard />);
    expect(screen.getByText("3 listed / 3")).toBeDefined();
    expect(
      screen.queryByRole("button", { name: "Load more" })
    ).not.toBeInTheDocument();
  });
  it("shows load more button if not all collections have been fetched", async () => {
    vi.mocked(useSWRInfinite).mockReturnValue({
      data: [
        {
          ...collectionsByOwner,
          totalCount: 10,
          pageKey: "somePageKey",
        },
      ],
      size: 1,
      setSize: vi.fn(),
      isLoading: false,
    });
    vi.mocked(useSWR).mockReturnValue({
      data: undefined,
      isLoading: false,
    });
    render(<Dashboard />);
    expect(screen.getByText("3 listed / 10")).toBeDefined();
    expect(
      screen.queryByRole("button", { name: "Load more" })
    ).toBeInTheDocument();
  });
});
