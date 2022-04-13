import { fireEvent, render, screen } from "@testing-library/react";
import SaveProjectModal from "../../modals/SaveProjectModal";

describe("<SaveProjectModal />", () => {
  it("renders without crashing", () => {
    const onDismiss = jest.fn();
    const { baseElement } = render(
      <SaveProjectModal isOpen={false} onDismiss={onDismiss} />
    );
    expect(baseElement).toBeDefined();
  });

  it("displays the title", async () => {
    const onDismiss = jest.fn();

    render(<SaveProjectModal isOpen={true} onDismiss={onDismiss} />);
    await screen.findByText("Save project");
  });

  it("test close button", async () => {
    const onDismiss = jest.fn();

    render(<SaveProjectModal isOpen={true} onDismiss={onDismiss} />);
    const button = await screen.findByText("Close");

    fireEvent.click(button);

    expect(onDismiss).toBeCalledTimes(1);
  });
});
