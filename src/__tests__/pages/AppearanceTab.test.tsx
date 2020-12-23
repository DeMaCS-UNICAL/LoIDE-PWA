/* eslint-disable @typescript-eslint/no-unused-expressions */

import React from "react";
import { render, screen } from "@testing-library/react";
import AppearanceTab from "../../pages/AppearanceTab";

test("AppearanceTab renders without crashing", () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    const { baseElement } = render(<AppearanceTab />);
    expect(baseElement).toBeDefined();
});

test("renders the sidebar title", async () => {
    render(<AppearanceTab />);
    await screen.findByText("Appearance");
});
