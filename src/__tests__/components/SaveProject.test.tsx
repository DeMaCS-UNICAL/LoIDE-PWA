import { fireEvent, render, screen } from "@testing-library/react";
import SaveProject from "../../components/SaveProject";

describe("<SaveProject />", () => {
  it("renders without crashing", () => {
    const { baseElement } = render(<SaveProject />);
    expect(baseElement).toBeDefined();
  });

  it("displays the project name label", async () => {
    render(<SaveProject />);
    await screen.findByText("Project name");
    await screen.findByPlaceholderText("Insert a project name");
  });

  it("test download button", async () => {
    global.URL.createObjectURL = jest.fn();
    render(<SaveProject />);
    const button = await screen.findByTitle("Download");

    fireEvent.click(button);

    expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1);
  });
});
