/* eslint-disable @typescript-eslint/no-unused-expressions */

import React from "react";
import { render, screen } from "@testing-library/react";
import RunSettingsTab from "../../pages/RunSettingsTab";
import { Provider } from "react-redux";
import { store } from "../../redux";

test("RunSettingsTab renders without crashing", () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    const { baseElement } = render(
        <Provider store={store}>
            <RunSettingsTab />
        </Provider>
    );
    expect(baseElement).toBeDefined();
});

test("renders the sidebar title", async () => {
    render(
        <Provider store={store}>
            <RunSettingsTab />
        </Provider>
    );
    await screen.findByText("Run settings");
});
