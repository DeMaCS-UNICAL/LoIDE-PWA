/* eslint-disable @typescript-eslint/no-unused-expressions */

import React from "react";
import { render, screen } from "@testing-library/react";
import RunSettingsTab from "../../pages/RunSettingsTab";

test("RunSettingsTab renders without crashing", () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    const { baseElement } = render(<RunSettingsTab />);
    expect(baseElement).toBeDefined();
});

test("renders the sidebar title", async () => {
    render(<RunSettingsTab />);
    await screen.findByText("Run settings");
});
