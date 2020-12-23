/* eslint-disable @typescript-eslint/no-unused-expressions */

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import OutputTab from "../../pages/OutputTab";

test("OutputTab renders without crashing", () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    const { baseElement } = render(<OutputTab />);
    expect(baseElement).toBeDefined();
});

test("renders the sidebar title", async () => {
    render(<OutputTab />);
    await screen.findByText("Output");
});

test("test download button", async () => {
    global.URL.createObjectURL = jest.fn();
    render(<OutputTab />);
    const buttons = await screen.findAllByTitle("Download");

    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
});

test("test download button", async () => {
    global.URL.createObjectURL = jest.fn();
    render(<OutputTab />);
    const button = await screen.findByTitle("Clear");

    fireEvent.click(button);
});
