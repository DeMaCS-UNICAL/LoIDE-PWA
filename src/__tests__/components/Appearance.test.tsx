/* eslint-disable @typescript-eslint/no-unused-expressions */

import { render } from "@testing-library/react";
import Appearance from "../../components/Appearance";
import { ionFireEvent } from "@ionic/react-test-utils";
import { Provider } from "react-redux";
import { store } from "../../redux";

describe("<Appearance />", () => {
  it("Appearance renders without crashing", () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    const { baseElement } = render(
      <Provider store={store}>
        <Provider store={store}>
          <Appearance />
        </Provider>
      </Provider>
    );
    expect(baseElement).toBeDefined();
  });

  it("renders the header titles", async () => {
    const { findByText } = render(
      <Provider store={store}>
        <Appearance />
      </Provider>
    );
    await findByText("General");
    await findByText("Editor");
    await findByText("Output");
  });

  it("test dark mode item", async () => {
    const { findByText, findByTitle } = render(
      <Provider store={store}>
        <Appearance />
      </Provider>
    );
    await findByText("Dark mode");
    const toogle = await findByTitle("Toogle dark mode");
    ionFireEvent.ionChange(toogle, "1");
  });

  it("test font size editor item", async () => {
    const { findByTitle } = render(
      <Provider store={store}>
        <Appearance />
      </Provider>
    );

    const range = await findByTitle("Font size editor range");
    const labelText = range.querySelector("ion-label")?.innerHTML.trim();
    ionFireEvent.ionChange(range, "1");

    expect(labelText).toBe("Font size");
  });

  it("test font size output item", async () => {
    const { findAllByText, findByTitle } = render(
      <Provider store={store}>
        <Appearance />
      </Provider>
    );
    await findAllByText("Font size");

    const range = await findByTitle("Font size output range");
    const labelText = range.querySelector("ion-label")?.innerHTML.trim();
    ionFireEvent.ionChange(range, "1");

    expect(labelText).toBe("Font size");
  });

  it("test reset button", async () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    const { findByTitle } = render(
      <Provider store={store}>
        <Appearance />
      </Provider>
    );

    const button = await findByTitle("Reset appearance options");
    ionFireEvent.click(button);
  });
});
