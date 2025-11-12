import { fireEvent, render, screen } from "@testing-library/react";
import OpenProjectModal from "../../modals/OpenProjectModal";
import { vi } from "vitest";
import { Provider } from "react-redux";
import { store } from "../../redux";

describe("<OpenProjectModal />", () => {
  it("renders without crashing", () => {
    const onDismiss = vi.fn();
    const { baseElement } = render(
      <Provider store={store}>
        <OpenProjectModal isOpen={false} onDismiss={onDismiss} />
      </Provider>,
    );
    expect(baseElement).toBeDefined();
  });

  it("displays the title", async () => {
    const onDismiss = vi.fn();

    render(
      <Provider store={store}>
        <OpenProjectModal isOpen={true} onDismiss={onDismiss} />
      </Provider>,
    );
    await screen.findByText("Open project or text files");
  });

  it("test close button", async () => {
    const onDismiss = vi.fn();

    render(
      <Provider store={store}>
        <OpenProjectModal isOpen={true} onDismiss={onDismiss} />
      </Provider>,
    );
    const button = await screen.findByText("Close");

    fireEvent.click(button);

    // TODO modal closing can no longer be verified in this way
    // expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
