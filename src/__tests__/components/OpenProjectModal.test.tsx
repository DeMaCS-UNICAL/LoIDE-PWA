import { fireEvent, render } from "@testing-library/react";
import OpenProjectModal from "../../modals/OpenProjectModal";
import { Provider } from "react-redux";
import { store } from "../../redux";

describe("<OpenProjectModal />", () => {
  it("renders without crashing", () => {
    const onDismiss = jest.fn();
    const { baseElement } = render(
      <Provider store={store}>
        <OpenProjectModal isOpen={false} onDismiss={onDismiss} />
      </Provider>
    );
    expect(baseElement).toBeDefined();
  });

  it("displays the title", async () => {
    const onDismiss = jest.fn();

    const { findByText } = render(
      <Provider store={store}>
        <OpenProjectModal isOpen={true} onDismiss={onDismiss} />
      </Provider>
    );
    await findByText("Open project or text files");
  });

  it("test close button", async () => {
    const onDismiss = jest.fn();

    const { findByText } = render(
      <Provider store={store}>
        <OpenProjectModal isOpen={true} onDismiss={onDismiss} />
      </Provider>
    );
    const button = await findByText("Close");

    fireEvent.click(button);

    expect(onDismiss).toBeCalledTimes(1);
  });
});
