import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SaveProject from "../../components/SaveProject";

test("renders without crashing", () => {
    const { baseElement } = render(<SaveProject />);
    expect(baseElement).toBeDefined();
});

test("displays the project name label", async () => {
    render(<SaveProject />);
    await screen.findByText("Project name");
    await screen.findByPlaceholderText("Insert a project name");
});

test("test download button", async () => {
    global.URL.createObjectURL = jest.fn();
    render(<SaveProject />);
    const button = await screen.findByTitle("Download");

    fireEvent.click(button);

    expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1);
});
