import { vi } from "vitest";
import React from "react";

export const setupRadixMocks = () => {
  const createMockComponent = (name) => {
    const MockComponent = ({ children, ...props }) => (
      <div data-testid={`mock-${name}`} {...props}>
        {children}
      </div>
    );
    MockComponent.displayName = `Mock${name}`;
    return MockComponent;
  };

  vi.mock("@radix-ui/themes", () => ({
    Theme: createMockComponent("Theme"),
    ScrollArea: createMockComponent("ScrollArea"),
    Avatar: createMockComponent("Avatar"),
    RadioCards: {
      Root: createMockComponent("RadioCardsRoot"),
      Items: createMockComponent("RadioCardsItems"),
    },
    Badge: createMockComponent("Badge"),
    Code: createMockComponent("Code"),
    Button: createMockComponent("Button"),
    Dialog: createMockComponent("Dialog"),
    Flex: createMockComponent("Flex"),
    Grid: createMockComponent("Grid"),
    Heading: createMockComponent("Heading"),
    Text: createMockComponent("Text"),
    TextField: createMockComponent("TextField"),
    Select: createMockComponent("Select"),
    Checkbox: createMockComponent("Checkbox"),
    Switch: createMockComponent("Switch"),
    Tabs: createMockComponent("Tabs"),
    Card: createMockComponent("Card"),
    Table: createMockComponent("Table"),
    // Add any other Radix UI components you're using
  }));
};
