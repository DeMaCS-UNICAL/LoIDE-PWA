/* eslint-disable @typescript-eslint/no-unused-expressions */

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import MainTab from "../../pages/MainTab";
import { Provider } from "react-redux";
import { store } from "../../redux";

Object.defineProperty(navigator, "clipboard", {
    value: {
        readText: jest.fn(),
    },
});

const defaultProps: any = {
    history: {
        replace: jest.fn(),
    },
};

test("MainTab renders without crashing", () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    const { baseElement } = render(
        <Provider store={store}>
            <MainTab {...defaultProps} />
        </Provider>
    );
    expect(baseElement).toBeDefined();
});

test("renders the image logo on nav bar", async () => {
    render(
        <Provider store={store}>
            <MainTab {...defaultProps} />
        </Provider>
    );
    await screen.findByAltText("loide-logo");
});

test("renders the sidebar title", async () => {
    render(
        <Provider store={store}>
            <MainTab {...defaultProps} />
        </Provider>
    );
    await screen.findByText("Run settings");
});

test("test open modal", async () => {
    render(
        <Provider store={store}>
            <MainTab {...defaultProps} />
        </Provider>
    );
    const button = await screen.findByText("Open");

    fireEvent.click(button);

    let modal: HTMLElement | null = await screen.findByText(
        "Open project or text files"
    );

    const closeButton = await screen.findByText("Close");

    fireEvent.click(closeButton);

    modal = await screen.queryByText("Open project or text files");

    expect(modal).toBeNull;
});

test("test save modal", async () => {
    render(
        <Provider store={store}>
            <MainTab {...defaultProps} />
        </Provider>
    );
    const button = await screen.findByText("Save");

    fireEvent.click(button);

    let modal: HTMLElement | null = await screen.findByText("Save project");

    const closeButton = await screen.findByText("Close");

    fireEvent.click(closeButton);

    modal = await screen.queryByText("Save project");

    expect(modal).toBeNull;
});

test("test save modal", async () => {
    render(
        <Provider store={store}>
            <MainTab {...defaultProps} />
        </Provider>
    );
    const button = await screen.findByText("Save");

    fireEvent.click(button);

    let modal: HTMLElement | null = await screen.findByText("Save project");

    const closeButton = await screen.findByText("Close");

    fireEvent.click(closeButton);

    modal = await screen.queryByText("Save project");

    expect(modal).toBeNull;
});

test("test operations popover", async () => {
    render(
        <Provider store={store}>
            <MainTab {...defaultProps} />
        </Provider>
    );
    const button = await screen.findByTitle("Operations");

    fireEvent.click(button);

    await screen.findByTestId("operations-popover");

    await screen.findAllByTitle("Open");
    await screen.findAllByTitle("Save");
    await screen.findAllByTitle("Reset");
});
