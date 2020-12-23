import React from "react";
import { render, screen } from "@testing-library/react";
import ShareProject from "../../components/ShareProject";

test("renders without crashing", () => {
    const { baseElement } = render(<ShareProject />);
    expect(baseElement).toBeDefined();
});

test("displays the project url input", async () => {
    render(<ShareProject />);
    await screen.findByTestId("url-input");
});

// test("test copy link button", async () => {
//     render(<ShareProject />);
//     const button = await screen.findByTitle("Copy link");

//     fireEvent.click(button);
// });
