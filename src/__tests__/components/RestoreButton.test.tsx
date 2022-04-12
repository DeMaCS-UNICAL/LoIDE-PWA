import { render } from "@testing-library/react";
import RestoreButton from "../../components/RestoreButton";

describe("<RestoreButton />", () => {
    it("renders without crashing", () => {
        const { baseElement } = render(<RestoreButton />);
        expect(baseElement).toBeDefined();
    });
});
