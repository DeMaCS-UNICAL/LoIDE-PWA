import { fireEvent, render } from "@testing-library/react";
import ShareProject from "../../components/ShareProject";

describe("<ShareProject />", () => {
  it("renders without crashing", () => {
    const { baseElement } = render(<ShareProject />);
    expect(baseElement).toBeDefined();
  });

  it("displays the project url input", async () => {
    const { findByTestId } = render(<ShareProject />);
    await findByTestId("url-input");
  });

  it.skip("test copy link button", async () => {
    const { findByTitle } = render(<ShareProject />);
    const button = await findByTitle("Copy link");

    fireEvent.click(button);
  });
});
