import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import Editor from "../../components/Editor";
import { Provider } from "react-redux";
import { store } from "../../redux";

// Mock LoideAceEditor to avoid loading the real Ace editor in tests
vi.mock("../../components/LoideAceEditor", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require("react");
  const MockLoideAceEditor = React.forwardRef(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (props: any, ref: any) =>
      React.createElement("textarea", {
        "data-testid": `loide-ace-editor-${props.tabKey ?? ""}`,
        ref: ref,
      }),
  );
  MockLoideAceEditor.displayName = "LoideAceEditor";
  return {
    __esModule: true,
    default: MockLoideAceEditor,
  };
});

Object.defineProperty(navigator, "clipboard", {
  value: {
    readText: vi.fn(),
  },
});

describe("<Editor />", () => {
  it("Editor renders without crashing", () => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    const { baseElement } = render(
      <Provider store={store}>
        <Editor />
      </Provider>,
    );
    expect(baseElement).toBeDefined();
  });

  it("renders the add tab button", async () => {
    render(
      <Provider store={store}>
        <Editor />
      </Provider>,
    );
    await screen.findByTitle("Add tab");
  });

  it("clicks the add tab button", async () => {
    render(
      <Provider store={store}>
        <Editor />
      </Provider>,
    );
    const button = await screen.findByTitle("Add tab");
    fireEvent.click(button);
  });
});
