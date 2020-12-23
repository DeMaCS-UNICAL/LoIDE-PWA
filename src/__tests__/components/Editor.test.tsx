import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Editor from "../../components/Editor";

Object.defineProperty(navigator, "clipboard", {
    value: {
        readText: jest.fn(),
    },
});

test("Editor renders without crashing", () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    const { baseElement } = render(<Editor />);
    expect(baseElement).toBeDefined();
});

test("renders the add tab button", async () => {
    render(<Editor />);
    await screen.findByTitle("Add tab");
});

test("clicks the add tab button", async () => {
    render(<Editor />);
    const button = await screen.findByTitle("Add tab");
    fireEvent.click(button);
});
