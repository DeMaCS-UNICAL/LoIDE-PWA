import { render } from "@testing-library/react";
import App from "../App";
import { LoidePath } from "../lib/constants";
import { Provider } from "react-redux";
import { store } from "../redux";

describe("<App />", () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  it("renders without crashing", () => {
    const { baseElement } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(baseElement).toBeDefined();
  });

  it("renders the Editor tab button", async () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const tabButton = container.querySelector(`[href="/${LoidePath.Editor}"]`);
    expect(tabButton).toBeTruthy();
  });

  it("renders the Run Settings tab button", async () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const tabButton = container.querySelector(
      `[href="/${LoidePath.RunSettings}"]`
    );
    expect(tabButton).toBeTruthy();
  });

  it("renders the Output tab button", async () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const tabButton = container.querySelector(`[href="/${LoidePath.Output}"]`);
    expect(tabButton).toBeTruthy();
  });

  it("renders the Appearance tab button", async () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const tabButton = container.querySelector(
      `[href="/${LoidePath.Appearance}"]`
    );
    expect(tabButton).toBeTruthy();
  });

  it("renders the About tab button", async () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const tabButton = container.querySelector(`[href="/${LoidePath.About}"]`);
    expect(tabButton).toBeTruthy();
  });
});
