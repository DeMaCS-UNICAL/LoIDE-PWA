import { fireEvent, render, screen } from "@testing-library/react";
import ShortcutsModal from "../../modals/ShortcutsModal";

describe("<ShortcutsModal />", () => {
    it("renders without crashing", () => {
        const onDismiss = jest.fn();
        const { baseElement } = render(
            <ShortcutsModal isOpen={false} onDismiss={onDismiss} />
        );
        expect(baseElement).toBeDefined();
    });

    it("displays the title", async () => {
        const onDismiss = jest.fn();

        render(<ShortcutsModal isOpen={true} onDismiss={onDismiss} />);
        await screen.findByText("Keyboard Shortcuts");
    });

    it("test close button", async () => {
        const onDismiss = jest.fn();

        render(<ShortcutsModal isOpen={true} onDismiss={onDismiss} />);
        const button = await screen.findByText("Close");

        fireEvent.click(button);

        expect(onDismiss).toBeCalledTimes(1);
    });
});
