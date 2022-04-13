import { render } from "@testing-library/react";
import RunSettings from "../../components/RunSettings";
import { Provider } from "react-redux";
import { store } from "../../redux";

describe("<RunSettings />", () => {
  it("renders without crashing", () => {
    const { baseElement } = render(
      <Provider store={store}>
        <RunSettings />
      </Provider>
    );
    expect(baseElement).toBeDefined();
  });

  it.skip("displays the main labels", async () => {
    const { findByText } = render(
      <Provider store={store}>
        <RunSettings />
      </Provider>
    );
    await findByText("Language, Solver and Executor");
    await findByText("Language");
    await findByText("Solver");
    await findByText("Executor");
    await findByText("Choose tab to execute");
    await findByText("Current tab");
  });
});
