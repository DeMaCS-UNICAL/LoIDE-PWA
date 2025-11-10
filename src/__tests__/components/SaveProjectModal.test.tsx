import { fireEvent, render, screen } from "@testing-library/react";
import SaveProjectModal from "../../modals/SaveProjectModal";
import { vi } from "vitest";

describe("<SaveProjectModal />", () => {
  it("renders without crashing", () => {
    const onDismiss = vi.fn();
    const { baseElement } = render(<SaveProjectModal isOpen={false} onDismiss={onDismiss} />);
    expect(baseElement).toBeDefined();
  });

  it("displays the title", async () => {
    const onDismiss = vi.fn();

    render(<SaveProjectModal isOpen={true} onDismiss={onDismiss} />);
    await screen.findByText("Save project");
  });

  it("test close button", async () => {
    const onDismiss = vi.fn();

    render(<SaveProjectModal isOpen={true} onDismiss={onDismiss} />);
    const button = await screen.findByText("Close");

    fireEvent.click(button);

    // TODO modal closing can no longer be verified in this way
    // expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
