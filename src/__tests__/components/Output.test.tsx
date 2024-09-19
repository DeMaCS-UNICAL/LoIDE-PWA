import { render, screen } from "@testing-library/react";
import Output from "../../components/Output";
import { store } from "../../redux";
import { Provider } from "react-redux";

const outputModel = "logic program output";
const outputError = "logic program error";

describe("<Output />", () => {
  it("renders without crashing", () => {
    const { baseElement } = render(
      <Provider store={store}>
        <Output model={outputModel} error={outputError} />
      </Provider>,
    );
    expect(baseElement).toBeDefined();
  });

  it("displays the output model", async () => {
    render(
      <Provider store={store}>
        <Output model={outputModel} error={outputError} />
      </Provider>,
    );
    await screen.findByText(outputModel);
  });

  it("displays the output error", async () => {
    render(
      <Provider store={store}>
        <Output model={outputModel} error={outputError} />
      </Provider>,
    );
    await screen.findByText(outputModel);
  });
});
