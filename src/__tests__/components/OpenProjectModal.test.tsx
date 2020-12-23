import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import OpenProjectModal from "../../modals/OpenProjectModal";

test("renders without crashing", () => {
    const onDismiss = jest.fn();
    const { baseElement } = render(
        <OpenProjectModal isOpen={false} onDismiss={onDismiss} />
    );
    expect(baseElement).toBeDefined();
});

test("displays the title", async () => {
    const onDismiss = jest.fn();

    render(<OpenProjectModal isOpen={true} onDismiss={onDismiss} />);
    await screen.findByText("Open project or text files");
});

test("test close button", async () => {
    const onDismiss = jest.fn();

    render(<OpenProjectModal isOpen={true} onDismiss={onDismiss} />);
    const button = await screen.findByText("Close");

    fireEvent.click(button);

    expect(onDismiss).toBeCalledTimes(1);
});
