import { fireEvent, render } from "@testing-library/react";
import ShareProjectModal from "../../modals/ShareProjectModal";

describe("<ShareProjectModal />", () => {
  it("renders without crashing", () => {
    const onDismiss = jest.fn();
    const { baseElement } = render(
      <ShareProjectModal isOpen={false} onDismiss={onDismiss} />
    );
    expect(baseElement).toBeDefined();
  });

  it("displays the title", async () => {
    const onDismiss = jest.fn();

    const { findByText } = render(
      <ShareProjectModal isOpen={true} onDismiss={onDismiss} />
    );
    await findByText("Share project");
  });

  it("test close button", async () => {
    const onDismiss = jest.fn();

    const { findByText } = render(
      <ShareProjectModal isOpen={true} onDismiss={onDismiss} />
    );
    const button = await findByText("Close");

    fireEvent.click(button);

    expect(onDismiss).toBeCalledTimes(1);
  });
});
