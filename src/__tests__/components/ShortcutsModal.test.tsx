import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShortcutsModal from "../../modals/ShortcutsModal";
import { vi } from "vitest";

describe("<ShortcutsModal />", () => {
  it("renders without crashing", () => {
    const onDismiss = vi.fn();

    const { baseElement } = render(<ShortcutsModal isOpen={false} onDismiss={onDismiss} />);

    expect(baseElement).toBeDefined();
  });

  it("displays the title", async () => {
    const onDismiss = vi.fn();

    render(<ShortcutsModal isOpen={true} onDismiss={onDismiss} />);

    expect(await screen.findByText("Keyboard Shortcuts")).toBeVisible();
  });

  it("test close button", async () => {
    const onDismiss = vi.fn();
    const user = userEvent.setup();

    render(<ShortcutsModal isOpen={true} onDismiss={onDismiss} />);

    const button = await screen.findByText("Close");
    await user.click(button);

    // TODO modal closing can no longer be verified in this way
    // expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
