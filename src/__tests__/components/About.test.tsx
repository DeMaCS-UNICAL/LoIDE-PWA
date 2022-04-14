import { render } from "@testing-library/react";
import About from "../../components/About";

describe("<About />", () => {
  it("renders without crashing", () => {
    const { baseElement } = render(<About />);
    expect(baseElement).toBeDefined();
  });

  it("renders the logo", async () => {
    const { findByAltText } = render(<About />);
    await findByAltText("loide-logo");
  });

  it("has the project url", async () => {
    const { getByText } = render(<About />);
    const element = getByText("demacs-unical.github.io/LoIDE").closest("a");
    expect(element).toHaveAttribute(
      "href",
      "https://demacs-unical.github.io/LoIDE/"
    );
  });

  it("has the github repo url", async () => {
    const { getByText } = render(<About />);
    const element = getByText("Github").closest("a");
    expect(element).toHaveAttribute(
      "href",
      "https://github.com/DeMaCS-UNICAL/LoIDE-PWA"
    );
  });

  it("has the license project url", async () => {
    const { getByText } = render(<About />);
    const element = getByText("MIT License").closest("a");
    expect(element).toHaveAttribute(
      "href",
      "https://github.com/DeMaCS-UNICAL/LoIDE-PWA/blob/main/LICENSE"
    );
  });

  it("has the license project url", async () => {
    const { getByText } = render(<About />);
    const respectLicenseString =
      "Use of all solvers and systems is provided under the respective licenses; we refrain from taking any responsibility for any use that goes out of the scopes of such licenses.";
    getByText(respectLicenseString);
  });

  it("has the email project", async () => {
    const { getByText } = render(<About />);
    getByText("loide@mat.unical.it");
  });
});
