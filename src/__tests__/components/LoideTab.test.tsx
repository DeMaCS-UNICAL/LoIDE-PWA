import { fireEvent, render, screen } from "@testing-library/react";
import LoideTab from "../../components/LoideTab";
import { SuffixNameTab } from "../../lib/constants";

describe("<LoideTab />", () => {
  const key = 1;
  const title = `${SuffixNameTab}1`;

  it("tab renders without crashing", () => {
    const deleteMock = jest.fn();
    const { baseElement } = render(
      <LoideTab tabkey={key} onDeleteTab={deleteMock}>
        <span> {title}</span>
      </LoideTab>,
    );
    expect(baseElement).toBeDefined();
  });

  it("renders tab title", async () => {
    const deleteMock = jest.fn();
    render(
      <LoideTab tabkey={key} onDeleteTab={deleteMock}>
        <span> {title}</span>
      </LoideTab>,
    );
    await screen.findByText(title);
  });

  it("clicks delete tab button", async () => {
    const deleteMock = jest.fn();
    render(
      <LoideTab tabkey={key} onDeleteTab={deleteMock}>
        <span> {title}</span>
      </LoideTab>,
    );

    const button = await screen.findByTitle("Delete tab");
    fireEvent.click(button);
    expect(deleteMock).toHaveBeenCalledTimes(1);
  });
});
