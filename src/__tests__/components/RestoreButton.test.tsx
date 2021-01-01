import React from "react";
import { render } from "@testing-library/react";
import RestoreButton from "../../components/RestoreButton";

test("renders without crashing", () => {
    const { baseElement } = render(<RestoreButton />);
    expect(baseElement).toBeDefined();
});
