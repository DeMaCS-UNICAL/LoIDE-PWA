import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShortcutsModal from "../../modals/ShortcutsModal";

describe("<ShortcutsModal />", () => {
	it("renders without crashing", () => {
		const onDismiss = jest.fn();

		const { baseElement } = render(<ShortcutsModal isOpen={false} onDismiss={onDismiss} />);

		expect(baseElement).toBeDefined();
	});

	it("displays the title", async () => {
		const onDismiss = jest.fn();

		render(<ShortcutsModal isOpen={true} onDismiss={onDismiss} />);

		expect(await screen.findByText("Keyboard Shortcuts")).toBeVisible();
	});

	it("test close button", async () => {
		const onDismiss = jest.fn();
		const user = userEvent.setup();

		render(<ShortcutsModal isOpen={true} onDismiss={onDismiss} />);

		const button = await screen.findByText("Close");
		await user.click(button);

		expect(onDismiss).toHaveBeenCalledTimes(1);
	});
});
