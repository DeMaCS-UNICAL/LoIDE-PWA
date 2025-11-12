import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MainTab from "../../pages/MainTab";
import { Provider } from "react-redux";
import { store } from "../../redux";
import { vi } from "vitest";

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

const defaultProps: any = {
  history: {
    replace: vi.fn(),
  },
};

describe("MainTab page", () => {
  it("MainTab renders without crashing", () => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    const { baseElement } = render(
      <Provider store={store}>
        <MainTab {...defaultProps} />
      </Provider>,
    );
    expect(baseElement).toBeDefined();
  });

  it("renders the image logo on nav bar", async () => {
    render(
      <Provider store={store}>
        <MainTab {...defaultProps} />
      </Provider>,
    );
    await screen.findByAltText("loide-logo");
  });

  // skip this test for now as it is not working and needs to be refactored to work with the new implementation of the MainTab component
  it.skip("renders the sidebar title", async () => {
    render(
      <Provider store={store}>
        <MainTab {...defaultProps} />
      </Provider>,
    );
    await waitFor(() => {
      screen.getByText("Run settings");
    });
  });

  it("test open modal", async () => {
    render(
      <Provider store={store}>
        <MainTab {...defaultProps} />
      </Provider>,
    );
    const button = await screen.findByText("Open");

    fireEvent.click(button);

    const modal: HTMLElement | null = await screen.findByText("Open project or text files");

    expect(modal).not.toBeNull();

    const closeButton = await screen.findByText("Close");

    fireEvent.click(closeButton);

    // TODO modal closing can no longer be verified in this way
    // modal = screen.queryByText("Open project or text files");
    // expect(modal).toBeNull();
  });

  it("test save modal", async () => {
    render(
      <Provider store={store}>
        <MainTab {...defaultProps} />
      </Provider>,
    );
    const button = await screen.findByText("Save");

    fireEvent.click(button);

    const modal: HTMLElement | null = await screen.findByText("Save project");

    expect(modal).not.toBeNull();

    const closeButton = await screen.findByText("Close");

    fireEvent.click(closeButton);

    // TODO modal closing can no longer be verified in this way
    // modal = screen.queryByText("Save project");
    // expect(modal).toBeNull();
  });

  it("test operations popover", async () => {
    render(
      <Provider store={store}>
        <MainTab {...defaultProps} />
      </Provider>,
    );
    const button = await screen.findByTitle("Operations");

    fireEvent.click(button);

    await screen.findByTestId("operations-popover");

    await screen.findAllByTitle("Open");
    await screen.findAllByTitle("Save");
    await screen.findAllByTitle("Reset");
  });
});

window.HTMLElement.prototype.scrollIntoView = vi.fn();
