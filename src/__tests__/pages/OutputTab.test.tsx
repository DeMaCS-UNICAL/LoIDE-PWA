/* eslint-disable @typescript-eslint/no-unused-expressions */

import { fireEvent, render } from "@testing-library/react";
import OutputTab from "../../pages/OutputTab";
import { Provider } from "react-redux";
import { store } from "../../redux";

describe("OutputTab page", () => {
  it("OutputTab renders without crashing", () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    const { baseElement } = render(
      <Provider store={store}>
        <OutputTab />
      </Provider>
    );
    expect(baseElement).toBeDefined();
  });

  it("renders the sidebar title", async () => {
    const { findByText } = render(
      <Provider store={store}>
        <OutputTab />
      </Provider>
    );
    await findByText("Output");
  });

  it("test download button", async () => {
    global.URL.createObjectURL = jest.fn();
    const { findAllByTitle } = render(
      <Provider store={store}>
        <OutputTab />
      </Provider>
    );
    const buttons = await findAllByTitle("Download");

    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
  });

  it("test download button", async () => {
    global.URL.createObjectURL = jest.fn();
    const { findByTitle } = render(
      <Provider store={store}>
        <OutputTab />
      </Provider>
    );
    const button = await findByTitle("Clear");

    fireEvent.click(button);
  });
});
