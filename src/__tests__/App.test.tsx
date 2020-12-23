import React from "react";
import { render } from "@testing-library/react";
import App from "../App";
import { LoidePath } from "../lib/constants";

test("renders without crashing", () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeDefined();
});

test("renders the Editor tab button", async () => {
    const { container } = render(<App />);
    const tabButton = container.querySelector(`[href="/${LoidePath.Editor}"]`);
    expect(tabButton).toBeTruthy();
});

test("renders the Run Settings tab button", async () => {
    const { container } = render(<App />);
    const tabButton = container.querySelector(
        `[href="/${LoidePath.RunSettings}"]`
    );
    expect(tabButton).toBeTruthy();
});

test("renders the Output tab button", async () => {
    const { container } = render(<App />);
    const tabButton = container.querySelector(`[href="/${LoidePath.Output}"]`);
    expect(tabButton).toBeTruthy();
});

test("renders the Appearance tab button", async () => {
    const { container } = render(<App />);
    const tabButton = container.querySelector(
        `[href="/${LoidePath.Appearance}"]`
    );
    expect(tabButton).toBeTruthy();
});

test("renders the About tab button", async () => {
    const { container } = render(<App />);
    const tabButton = container.querySelector(`[href="/${LoidePath.About}"]`);
    expect(tabButton).toBeTruthy();
});
