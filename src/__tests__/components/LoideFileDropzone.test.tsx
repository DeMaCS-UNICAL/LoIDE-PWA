import React from "react";
import { render, screen } from "@testing-library/react";
import LoideFileDropzone from "../../components/LoideFileDropzone";

test("renders without crashing", () => {
    const { baseElement } = render(<LoideFileDropzone />);
    expect(baseElement).toBeDefined();
});

test("displays the main dropzone text", async () => {
    render(<LoideFileDropzone />);
    await screen.findByText(
        "Drag 'n' drop some files here, or click to select files."
    );
});
