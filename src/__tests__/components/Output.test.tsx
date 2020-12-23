import React from "react";
import { render, screen } from "@testing-library/react";
import Output from "../../components/Output";

const outputModel = "logic program output";
const outputError = "logic program error";

test("renders without crashing", () => {
    const { baseElement } = render(
        <Output model={outputModel} error={outputError} />
    );
    expect(baseElement).toBeDefined();
});

test("displays the output model", async () => {
    render(<Output model={outputModel} error={outputError} />);
    await screen.findByText(outputModel);
});

test("displays the output error", async () => {
    render(<Output model={outputModel} error={outputError} />);
    await screen.findByText(outputModel);
});
