import { fireEvent, render } from "@testing-library/react";
import SaveProject from "../../components/SaveProject";

describe("<SaveProject />", () => {
  it("renders without crashing", () => {
    const { baseElement } = render(<SaveProject />);
    expect(baseElement).toBeDefined();
  });

  it("displays the project name label", async () => {
    const { findByText, findAllByPlaceholderText } = render(<SaveProject />);
    await findByText("Project name");
    await findAllByPlaceholderText("Insert a project name");
  });

  it("test download button", async () => {
    global.URL.createObjectURL = jest.fn();
    const { findByTitle } = render(<SaveProject />);
    const button = await findByTitle("Download");

    fireEvent.click(button);

    expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1);
  });
});
