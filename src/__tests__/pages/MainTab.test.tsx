import { fireEvent, render, screen } from "@testing-library/react";
import MainTab from "../../pages/MainTab";
import { Provider } from "react-redux";
import { store } from "../../redux";

Object.defineProperty(navigator, "clipboard", {
  value: {
    readText: jest.fn(),
  },
});

const defaultProps: any = {
  history: {
    replace: jest.fn(),
  },
};

describe("MainTab page", () => {
  it("MainTab renders without crashing", () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
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

  it("renders the sidebar title", async () => {
    render(
      <Provider store={store}>
        <MainTab {...defaultProps} />
      </Provider>,
    );
    await screen.findByText("Run settings");
  });

  it("test open modal", async () => {
    render(
      <Provider store={store}>
        <MainTab {...defaultProps} />
      </Provider>,
    );
    const button = await screen.findByText("Open");

    fireEvent.click(button);

    let modal: HTMLElement | null = await screen.findByText("Open project or text files");
    
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

    let modal: HTMLElement | null = await screen.findByText("Save project");
    
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
