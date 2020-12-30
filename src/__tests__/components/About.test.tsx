import React from "react";
import { render, screen } from "@testing-library/react";
import About from "../../components/About";

test("renders without crashing", () => {
    const { baseElement } = render(<About />);
    expect(baseElement).toBeDefined();
});

test("renders the logo", async () => {
    render(<About />);
    await screen.findByAltText("loide-logo");
});

test("has the project url", async () => {
    render(<About />);
    const element = screen
        .getByText("demacs-unical.github.io/LoIDE")
        .closest("a");
    expect(element).toHaveAttribute(
        "href",
        "https://demacs-unical.github.io/LoIDE/"
    );
});

test("has the github repo url", async () => {
    render(<About />);
    const element = screen.getByText("Github").closest("a");
    expect(element).toHaveAttribute(
        "href",
        "https://github.com/DeMaCS-UNICAL/LoIDE-PWA"
    );
});

test("has the license project url", async () => {
    render(<About />);
    const element = screen.getByText("MIT License").closest("a");
    expect(element).toHaveAttribute(
        "href",
        "https://github.com/DeMaCS-UNICAL/LoIDE-PWA/blob/main/LICENSE"
    );
});

test("has the license project url", async () => {
    render(<About />);
    const respectLicenseString =
        "Use of all solvers and systems is provided under the respective licenses; we refrain from taking any responsibility for any use that goes out of the scopes of such licenses.";
    screen.getByText(respectLicenseString);
});

test("has the email project", async () => {
    render(<About />);
    screen.getByText("loide@mat.unical.it");
});
