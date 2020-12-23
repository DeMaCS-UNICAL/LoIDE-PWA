/* eslint-disable @typescript-eslint/no-unused-expressions */

import React from "react";
import { render, screen } from "@testing-library/react";
import AboutTab from "../../pages/AboutTab";

test("RunSettingsTab renders without crashing", () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    const { baseElement } = render(<AboutTab />);
    expect(baseElement).toBeDefined();
});

test("renders the sidebar title", async () => {
    render(<AboutTab />);
    await screen.findByText("About LoIDE");
});
