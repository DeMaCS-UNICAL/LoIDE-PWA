import React from "react";
import { render } from "@testing-library/react";
import RunSettings from "../../components/RunSettings";

test("renders without crashing", () => {
    const { baseElement } = render(<RunSettings />);
    expect(baseElement).toBeDefined();
});

// test("displays the main labels", async () => {
//     render(<RunSettings />);
//     await screen.findByText("Language, Solver and Executor");
//     await screen.findByText("Language");
//     await screen.findByText("Solver");
//     await screen.findByText("Executor");
//     await screen.findByText("Choose tab to execute");
//     await screen.findByText("Current tab");
// });
