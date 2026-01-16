import { render, screen } from "@testing-library/react";
import App from "../App";
import { Provider } from "react-redux";
import { store } from "../redux";
import { vi, describe, beforeAll, it, expect } from "vitest";

vi.mock("../lib/api");

// Mock LoideAceEditor to avoid loading the real Ace editor in tests
vi.mock("../components/LoideAceEditor", () => {
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

describe("<App />", () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it("renders without crashing", () => {
    const { baseElement } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(baseElement).toBeDefined();
  });

  it("renders the Editor tab button", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    screen.getByText("Editor");
  });

  it("renders the Run Settings tab button", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    // Multiple "Run Settings" texts exist (tab bar + sidebar segment), so check for at least one
    const runSettings = screen.getAllByText("Run Settings");
    expect(runSettings.length).toBeGreaterThan(0);
  });

  it("renders the Output tab button", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    // Multiple "Output" texts exist (tab bar + sidebar segment), so check for at least one
    const outputs = screen.getAllByText("Output");
    expect(outputs.length).toBeGreaterThan(0);
  });

  it("renders the Appearance tab button", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(screen.getByText("Appearance")).toBeInTheDocument();
  });

  it("renders the About tab button", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(screen.getByText("About")).toBeInTheDocument();
  });
});
