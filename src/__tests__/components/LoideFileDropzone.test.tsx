import { render, screen } from "@testing-library/react";
import LoideFileDropzone from "../../components/LoideFileDropzone";
import { Provider } from "react-redux";
import { store } from "../../redux";

describe("<LoideFileDropzone />", () => {
    it("renders without crashing", () => {
        const { baseElement } = render(
            <Provider store={store}>
                <LoideFileDropzone />
            </Provider>
        );
        expect(baseElement).toBeDefined();
    });

    it("displays the main dropzone text", async () => {
        render(
            <Provider store={store}>
                <LoideFileDropzone />
            </Provider>
        );
        await screen.findByText(
            "Drag 'n' drop some files here, or click to select files."
        );
    });
});
