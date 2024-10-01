import { render, screen, fireEvent } from "@testing-library/react";
import LoideRunNavButton from "../../components/LoideRunNavButton";
import { store } from "../../redux";
import { Provider } from "react-redux";

describe("<LoideRunNavButton />", () => {
  it("renders without crashing", () => {
    const { baseElement } = render(
      <Provider store={store}>
        <LoideRunNavButton />
      </Provider>,
    );
    expect(baseElement).toBeDefined();
  });

  it("renders run button text", async () => {
    render(
      <Provider store={store}>
        <LoideRunNavButton />
      </Provider>,
    );
    await screen.findByText("Run");
  });

  it("clicks run button", async () => {
    render(
      <Provider store={store}>
        <LoideRunNavButton />
      </Provider>,
    );
    const button = await screen.findByTitle("run");
    fireEvent.click(button);
  });
});
