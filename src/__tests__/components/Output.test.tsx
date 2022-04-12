import { render, screen } from "@testing-library/react";
import Output from "../../components/Output";

const outputModel = "logic program output";
const outputError = "logic program error";

describe("<Output />", () => {
    it("renders without crashing", () => {
        const { baseElement } = render(
            <Output model={outputModel} error={outputError} />
        );
        expect(baseElement).toBeDefined();
    });

    it("displays the output model", async () => {
        render(<Output model={outputModel} error={outputError} />);
        await screen.findByText(outputModel);
    });

    it("displays the output error", async () => {
        render(<Output model={outputModel} error={outputError} />);
        await screen.findByText(outputModel);
    });
});
