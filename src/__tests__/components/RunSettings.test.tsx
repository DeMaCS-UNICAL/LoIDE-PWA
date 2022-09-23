import { render, screen } from "@testing-library/react";
import RunSettings from "../../components/RunSettings";
import { Provider } from "react-redux";
import { store } from "../../redux";

describe("<RunSettings />", () => {
  it("renders without crashing", () => {
    const { baseElement } = render(
      <Provider store={store}>
        <RunSettings />
      </Provider>,
    );
    expect(baseElement).toBeDefined();
  });

  it.skip("displays the main labels", async () => {
    render(
      <Provider store={store}>
        <RunSettings />
      </Provider>,
    );
    await screen.findByText("Language, Solver and Executor");
    await screen.findByText("Language");
    await screen.findByText("Solver");
    await screen.findByText("Executor");
    await screen.findByText("Choose tab to execute");
    await screen.findByText("Current tab");
  });
});
