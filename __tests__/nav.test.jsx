import { expect, test } from "vitest";
import { render, screen } from "../test/test-utils";

import Nav from "../components/nav";

test("Nav", () => {
  render(<Nav />);
  expect(
    screen.getByRole("heading", { name: /token swoosh/i })
  ).toBeInTheDocument();
});
