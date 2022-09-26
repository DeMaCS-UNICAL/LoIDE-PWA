import { fireEvent, render, screen } from "@testing-library/react";
import OutputTab from "../../pages/OutputTab";
import { Provider } from "react-redux";
import { store } from "../../redux";

describe("OutputTab page", () => {
  it("OutputTab renders without crashing", () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    const { baseElement } = render(
      <Provider store={store}>
        <OutputTab />
      </Provider>,
    );
    expect(baseElement).toBeDefined();
  });

  it("renders the sidebar title", async () => {
    render(
      <Provider store={store}>
        <OutputTab />
      </Provider>,
    );
    await screen.findByText("Output");
  });

  it("test download button", async () => {
    global.URL.createObjectURL = jest.fn();
    render(
      <Provider store={store}>
        <OutputTab />
      </Provider>,
    );
    const buttons = await screen.findAllByTitle("Download");

    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
  });

  it("test clear button", async () => {
    global.URL.createObjectURL = jest.fn();
    render(
      <Provider store={store}>
        <OutputTab />
      </Provider>,
    );
    const button = await screen.findByTitle("Clear");

    fireEvent.click(button);
  });
});
