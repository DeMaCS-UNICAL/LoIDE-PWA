import { render, screen } from "@testing-library/react";
import RunSettingsTab from "../../pages/RunSettingsTab";
import { Provider } from "react-redux";
import { store } from "../../redux";
import { vi } from "vitest";

describe("RunSettingsTab page", () => {
  it("renders without crashing", () => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    const { baseElement } = render(
      <Provider store={store}>
        <RunSettingsTab />
      </Provider>,
    );
    expect(baseElement).toBeDefined();
  });

  it("renders the sidebar title", async () => {
    render(
      <Provider store={store}>
        <RunSettingsTab />
      </Provider>,
    );
    expect(await screen.findByText("Run settings")).toBeInTheDocument();
  });
});
