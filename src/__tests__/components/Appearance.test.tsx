import { render, screen } from "@testing-library/react";
import Appearance from "../../components/Appearance";
import { ionFireEvent } from "@ionic/react-test-utils";
import { Provider } from "react-redux";
import { store } from "../../redux";

describe("<Appearance />", () => {
  it("Appearance renders without crashing", () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    const { baseElement } = render(
      <Provider store={store}>
        <Provider store={store}>
          <Appearance />
        </Provider>
      </Provider>,
    );
    expect(baseElement).toBeDefined();
  });

  it("renders the header titles", async () => {
    render(
      <Provider store={store}>
        <Appearance />
      </Provider>,
    );
    await screen.findByText("General");
    await screen.findByText("Editor");
    await screen.findByText("Output");
  });

  it("test dark mode item", async () => {
    render(
      <Provider store={store}>
        <Appearance />
      </Provider>,
    );
    await screen.findByText("Dark mode");
    const toogle = await screen.findByTitle("Toogle dark mode");
    ionFireEvent.ionChange(toogle, "1");
  });

  it("test font size editor item", async () => {
    render(
      <Provider store={store}>
        <Appearance />
      </Provider>,
    );

    const range = await screen.findByTitle("Font size editor range");
    const labelTexts = screen.queryAllByText("Font size");
    ionFireEvent.ionChange(range, "1");

    expect(labelTexts.length).toBeGreaterThanOrEqual(1);
  });

  it("test font size output item", async () => {
    render(
      <Provider store={store}>
        <Appearance />
      </Provider>,
    );
    await screen.findAllByText("Font size");

    const range = await screen.findByTitle("Font size output range");
    const labelTexts = screen.queryAllByText("Font size");
    ionFireEvent.ionChange(range, "1");

    expect(labelTexts.length).toBeGreaterThanOrEqual(1);
  });

  it("test reset button", async () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    render(
      <Provider store={store}>
        <Appearance />
      </Provider>,
    );

    const button = await screen.findByTitle("Reset appearance options");
    ionFireEvent.click(button);
  });
});
