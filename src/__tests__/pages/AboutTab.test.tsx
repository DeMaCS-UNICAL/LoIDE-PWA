import { render, screen } from "@testing-library/react";
import AboutTab from "../../pages/AboutTab";
import { vi } from "vitest";

describe("AboutTab page", () => {
  it("RunSettingsTab renders without crashing", () => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    const { baseElement } = render(<AboutTab />);
    expect(baseElement).toBeDefined();
  });

  it("renders the sidebar title", async () => {
    render(<AboutTab />);
    await screen.findByText("About LoIDE");
  });
});
