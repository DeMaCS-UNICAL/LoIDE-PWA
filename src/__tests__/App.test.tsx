import { render, screen } from "@testing-library/react";
import App from "../App";
import { Provider } from "react-redux";
import { store } from "../redux";

jest.mock("../lib/api");

describe.only("<App />", () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
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
    screen.getByText("Run Settings");
  });

  it("renders the Output tab button", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    screen.getByText("Output");
  });

  it("renders the Appearance tab button", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    screen.getByText("Appearance");
  });

  it("renders the About tab button", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    screen.getByText("About");
  });
});
