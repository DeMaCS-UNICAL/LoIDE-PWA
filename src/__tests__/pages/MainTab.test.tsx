/* eslint-disable @typescript-eslint/no-unused-expressions */

import { fireEvent, render } from "@testing-library/react";
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
      </Provider>
    );
    expect(baseElement).toBeDefined();
  });

  it("renders the image logo on nav bar", async () => {
    const { findByAltText } = render(
      <Provider store={store}>
        <MainTab {...defaultProps} />
      </Provider>
    );
    await findByAltText("loide-logo");
  });

  it("renders the sidebar title", async () => {
    const { findByText } = render(
      <Provider store={store}>
        <MainTab {...defaultProps} />
      </Provider>
    );
    await findByText("Run settings");
  });

  it("test open modal", async () => {
    const { findByText, queryByText } = render(
      <Provider store={store}>
        <MainTab {...defaultProps} />
      </Provider>
    );
    const button = await findByText("Open");

    fireEvent.click(button);

    let modal: HTMLElement | null = await findByText(
      "Open project or text files"
    );

    const closeButton = await findByText("Close");

    fireEvent.click(closeButton);

    modal = await queryByText("Open project or text files");

    expect(modal).toBeNull;
  });

  it("test save modal", async () => {
    const { findByText, queryByText } = render(
      <Provider store={store}>
        <MainTab {...defaultProps} />
      </Provider>
    );
    const button = await findByText("Save");

    fireEvent.click(button);

    let modal: HTMLElement | null = await findByText("Save project");

    const closeButton = await findByText("Close");

    fireEvent.click(closeButton);

    modal = await queryByText("Save project");

    expect(modal).toBeNull;
  });

  it("test save modal", async () => {
    const { findByText, queryByText } = render(
      <Provider store={store}>
        <MainTab {...defaultProps} />
      </Provider>
    );
    const button = await findByText("Save");

    fireEvent.click(button);

    let modal: HTMLElement | null = await findByText("Save project");

    const closeButton = await findByText("Close");

    fireEvent.click(closeButton);

    modal = await queryByText("Save project");

    expect(modal).toBeNull;
  });

  it("test operations popover", async () => {
    const { findByTitle, findByTestId, findAllByTitle } = render(
      <Provider store={store}>
        <MainTab {...defaultProps} />
      </Provider>
    );
    const button = await findByTitle("Operations");

    fireEvent.click(button);

    await findByTestId("operations-popover");

    await findAllByTitle("Open");
    await findAllByTitle("Save");
    await findAllByTitle("Reset");
  });
});
