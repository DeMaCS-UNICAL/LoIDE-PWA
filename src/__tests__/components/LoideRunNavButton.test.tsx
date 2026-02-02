import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
    expect(await screen.findByTitle("run")).toBeDefined();
  });

  it("clicks run button", async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <LoideRunNavButton />
      </Provider>,
    );
    const button = await screen.findByTitle("run");
    await user.click(button);
  });
});
