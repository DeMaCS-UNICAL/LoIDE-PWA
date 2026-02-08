import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoideTabBar from "../../components/LoideTabBar";
import { describe, it, expect } from "vitest";

describe("<LoideTabBar />", () => {
  it("renders without crashing", () => {
    const { baseElement } = render(
      <MemoryRouter>
        <LoideTabBar newOutput={false} outputPanelVisible={false} />
      </MemoryRouter>,
    );
    expect(baseElement).toBeDefined();
  });

  it("renders all tab buttons", () => {
    render(
      <MemoryRouter>
        <LoideTabBar newOutput={false} outputPanelVisible={false} />
      </MemoryRouter>,
    );
    expect(screen.getByText("Editor")).toBeInTheDocument();
    expect(screen.getByText("Run Settings")).toBeInTheDocument();
    expect(screen.getByText("Output")).toBeInTheDocument();
    expect(screen.getByText("Appearance")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("shows badge when newOutput is true and not on editor tab", () => {
    render(
      <MemoryRouter initialEntries={["/appearance"]}>
        <LoideTabBar newOutput={true} outputPanelVisible={false} />
      </MemoryRouter>,
    );
    const badges = screen.getAllByText("!");
    expect(badges.length).toBeGreaterThan(0);
  });

  it("hides badge when on editor tab", () => {
    render(
      <MemoryRouter initialEntries={["/editor"]}>
        <LoideTabBar newOutput={true} outputPanelVisible={false} />
      </MemoryRouter>,
    );
    expect(screen.queryByText("!")).not.toBeInTheDocument();
  });

  it("hides badge when output panel is visible", () => {
    render(
      <MemoryRouter initialEntries={["/appearance"]}>
        <LoideTabBar newOutput={true} outputPanelVisible={true} />
      </MemoryRouter>,
    );
    expect(screen.queryByText("!")).not.toBeInTheDocument();
  });

  it("hides badge when newOutput is false", () => {
    render(
      <MemoryRouter initialEntries={["/appearance"]}>
        <LoideTabBar newOutput={false} outputPanelVisible={false} />
      </MemoryRouter>,
    );
    expect(screen.queryByText("!")).not.toBeInTheDocument();
  });

  it("shows badge on output tab when newOutput is true and not on editor tab", () => {
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <LoideTabBar newOutput={true} outputPanelVisible={false} />
      </MemoryRouter>,
    );
    const outputTabButton = screen.getByText("Output").closest("ion-tab-button");
    expect(outputTabButton).toContainHTML("!");
  });
});
