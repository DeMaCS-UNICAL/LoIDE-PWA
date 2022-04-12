import { fireEvent, render, screen } from "@testing-library/react";
import ShareProject from "../../components/ShareProject";

describe("<ShareProject />", () => {
    it("renders without crashing", () => {
        const { baseElement } = render(<ShareProject />);
        expect(baseElement).toBeDefined();
    });

    it("displays the project url input", async () => {
        render(<ShareProject />);
        await screen.findByTestId("url-input");
    });

    it.skip("test copy link button", async () => {
        render(<ShareProject />);
        const button = await screen.findByTitle("Copy link");

        fireEvent.click(button);
    });
});
