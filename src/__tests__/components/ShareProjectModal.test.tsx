import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ShareProjectModal from "../../modals/ShareProjectModal";

test("renders without crashing", () => {
    const onDismiss = jest.fn();
    const { baseElement } = render(
        <ShareProjectModal isOpen={false} onDismiss={onDismiss} />
    );
    expect(baseElement).toBeDefined();
});

test("displays the title", async () => {
    const onDismiss = jest.fn();

    render(<ShareProjectModal isOpen={true} onDismiss={onDismiss} />);
    await screen.findByText("Share project");
});

test("test close button", async () => {
    const onDismiss = jest.fn();

    render(<ShareProjectModal isOpen={true} onDismiss={onDismiss} />);
    const button = await screen.findByText("Close");

    fireEvent.click(button);

    expect(onDismiss).toBeCalledTimes(1);
});
