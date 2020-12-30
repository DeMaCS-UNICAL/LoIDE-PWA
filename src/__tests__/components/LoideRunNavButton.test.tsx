import React from "react";
import { render, screen } from "@testing-library/react";
import LoideRunNavButton from "../../components/LoideRunNavButton";
import { ionFireEvent as fireEvent } from "@ionic/react-test-utils";
import { store } from "../../redux";
import { Provider } from "react-redux";

test("LoideRunNavButton renders without crashing", () => {
    const { baseElement } = render(
        <Provider store={store}>
            <LoideRunNavButton />
        </Provider>
    );
    expect(baseElement).toBeDefined();
});

test("renders run button text", async () => {
    render(
        <Provider store={store}>
            <LoideRunNavButton />
        </Provider>
    );
    await screen.findByText("Run");
});

test("clicks run button", async () => {
    const { findByTitle } = render(
        <Provider store={store}>
            <LoideRunNavButton />
        </Provider>
    );
    const button = await findByTitle("run");
    fireEvent.click(button);
});
