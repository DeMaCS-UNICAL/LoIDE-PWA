import { fireEvent, render, screen } from "@testing-library/react";
import Editor from "../../components/Editor";
import { Provider } from "react-redux";
import { store } from "../../redux";

Object.defineProperty(navigator, "clipboard", {
    value: {
        readText: jest.fn(),
    },
});

describe("<Editor />", () => {
    it("Editor renders without crashing", () => {
        window.HTMLElement.prototype.scrollIntoView = jest.fn();
        const { baseElement } = render(
            <Provider store={store}>
                <Editor />
            </Provider>
        );
        expect(baseElement).toBeDefined();
    });

    it("renders the add tab button", async () => {
        render(
            <Provider store={store}>
                <Editor />
            </Provider>
        );
        await screen.findByTitle("Add tab");
    });

    it("clicks the add tab button", async () => {
        render(
            <Provider store={store}>
                <Editor />
            </Provider>
        );
        const button = await screen.findByTitle("Add tab");
        fireEvent.click(button);
    });
});
