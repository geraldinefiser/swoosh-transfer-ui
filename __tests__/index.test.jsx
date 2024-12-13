import { render } from "@/test/test-utils";
import { screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Home from "@/pages/index";
import { useAccount } from "wagmi";

vi.mock("wagmi", async () => {
  const actual = await vi.importActual("wagmi");
  return {
    ...actual,
    useAccount: vi.fn(),
  };
});
describe("Landing page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  it("renders a welcome message if no wallet is connected", async () => {
    vi.mocked(useAccount).mockReturnValue({ address: null });

    const { router } = render(<Home />);
    await waitFor(() => {
      expect(
        screen.getByText(/Welcome to Token Swoosh WebApp /i)
      ).toBeInTheDocument();
    });
    expect(router.push).not.toHaveBeenCalled();
  });

  it("redirects to dashboard if wallet is connected", async () => {
    vi.mocked(useAccount).mockReturnValue({ address: "0x1234" });
    const { router } = render(<Home />);
    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith("/dashboard");
    });
  });
});
