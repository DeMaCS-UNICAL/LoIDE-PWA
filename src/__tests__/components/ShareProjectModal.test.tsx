import { render, screen } from "@testing-library/react";
import ShareProjectModal from "../../modals/ShareProjectModal";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("<ShareProjectModal />", () => {
  it("renders without crashing", () => {
    const onDismiss = vi.fn();
    const { baseElement } = render(<ShareProjectModal isOpen={false} onDismiss={onDismiss} />);
    expect(baseElement).toBeDefined();
  });

  it("displays the title", async () => {
    const onDismiss = vi.fn();

    render(<ShareProjectModal isOpen={true} onDismiss={onDismiss} />);
    expect(await screen.findByText("Share project")).toBeInTheDocument();
  });

  it.skip("test close button", async () => {
    const onDismiss = vi.fn();

    const user = userEvent.setup();

    render(<ShareProjectModal isOpen={true} onDismiss={onDismiss} />);
    const button = await screen.findByText("Close");

    await user.click(button);

    // TODO modal closing can no longer be verified in this way
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
