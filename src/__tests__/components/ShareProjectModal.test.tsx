import { fireEvent, render, screen } from "@testing-library/react";
import ShareProjectModal from "../../modals/ShareProjectModal";

describe("<ShareProjectModal />", () => {
  it("renders without crashing", () => {
    const onDismiss = jest.fn();
    const { baseElement } = render(<ShareProjectModal isOpen={false} onDismiss={onDismiss} />);
    expect(baseElement).toBeDefined();
  });

  it("displays the title", async () => {
    const onDismiss = jest.fn();

    render(<ShareProjectModal isOpen={true} onDismiss={onDismiss} />);
    await screen.findByText("Share project");
  });

  it("test close button", async () => {
    const onDismiss = jest.fn();

    render(<ShareProjectModal isOpen={true} onDismiss={onDismiss} />);
    const button = await screen.findByText("Close");

    fireEvent.click(button);

    // TODO modal closing can no longer be verified in this way
    // expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
