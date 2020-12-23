import React from "react";
import { render, screen } from "@testing-library/react";
import LoideRunNavButton from "../../components/LoideRunNavButton";
import { ionFireEvent as fireEvent } from "@ionic/react-test-utils";

test("LoideRunNavButton renders without crashing", () => {
    const { baseElement } = render(<LoideRunNavButton />);
    expect(baseElement).toBeDefined();
});

test("renders run button text", async () => {
    render(<LoideRunNavButton />);
    await screen.findByText("Run");
});

test("clicks run button", async () => {
    const { findByTitle } = render(<LoideRunNavButton />);
    const button = await findByTitle("run");
    fireEvent.click(button);
});
