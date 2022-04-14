/* eslint-disable @typescript-eslint/no-unused-expressions */

import { render } from "@testing-library/react";
import AppearanceTab from "../../pages/AppearanceTab";
import { Provider } from "react-redux";
import { store } from "../../redux";

describe("AppearanceTab page", () => {
  it("AppearanceTab renders without crashing", () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    const { baseElement } = render(
      <Provider store={store}>
        <AppearanceTab />
      </Provider>
    );
    expect(baseElement).toBeDefined();
  });

  it("renders the sidebar title", async () => {
    const { findByText } = render(
      <Provider store={store}>
        <AppearanceTab />
      </Provider>
    );
    await findByText("Appearance");
  });
});
