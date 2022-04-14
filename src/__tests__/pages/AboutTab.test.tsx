/* eslint-disable @typescript-eslint/no-unused-expressions */

import { render } from "@testing-library/react";
import AboutTab from "../../pages/AboutTab";

describe("AboutTab page", () => {
  it("RunSettingsTab renders without crashing", () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    const { baseElement } = render(<AboutTab />);
    expect(baseElement).toBeDefined();
  });

  it("renders the sidebar title", async () => {
    const { findByText } = render(<AboutTab />);
    await findByText("About LoIDE");
  });
});
