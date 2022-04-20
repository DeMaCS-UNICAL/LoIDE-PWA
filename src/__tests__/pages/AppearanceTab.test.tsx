import { render, screen } from "@testing-library/react";
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
    render(
      <Provider store={store}>
        <AppearanceTab />
      </Provider>
    );
    await screen.findByText("Appearance");
  });
});
