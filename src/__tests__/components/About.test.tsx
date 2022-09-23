import { render, screen } from "@testing-library/react";
import About from "../../components/About";

describe("<About />", () => {
  it("renders without crashing", () => {
    const { baseElement } = render(<About />);
    expect(baseElement).toBeDefined();
  });

  it("renders the logo", async () => {
    render(<About />);
    await screen.findByAltText("loide-logo");
  });

  it("has the project url", async () => {
    render(<About />);
    const link = screen.getByRole("link", {
      name: "demacs-unical.github.io/LoIDE",
    });

    expect(link).toHaveAttribute("href", "https://demacs-unical.github.io/LoIDE/");
  });

  it("has the github repo url", async () => {
    render(<About />);
    const link = screen.getByRole("link", { name: "Github" });
    expect(link).toHaveAttribute("href", "https://github.com/DeMaCS-UNICAL/LoIDE-PWA");
  });

  it("has the license project url", async () => {
    render(<About />);
    const link = screen.getByRole("link", { name: "MIT License" });
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/DeMaCS-UNICAL/LoIDE-PWA/blob/main/LICENSE",
    );
  });

  it("has the respect license descprition", async () => {
    render(<About />);
    const respectLicenseString =
      "Use of all solvers and systems is provided under the respective licenses; we refrain from taking any responsibility for any use that goes out of the scopes of such licenses.";
    screen.getByText(respectLicenseString);
  });

  it("has the email project", async () => {
    render(<About />);
    screen.getByText("loide@mat.unical.it");
  });
});
