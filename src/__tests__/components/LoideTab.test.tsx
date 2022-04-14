import { fireEvent, render } from "@testing-library/react";
import LoideTab from "../../components/LoideTab";
import { SuffixNameTab } from "../../lib/constants";

describe("<LoideTab />", () => {
  it("tab renders without crashing", () => {
    const key: number = 1;
    const title = `${SuffixNameTab}1`;
    const deleteMock = jest.fn();
    const { baseElement } = render(
      <LoideTab tabkey={key} onDeleteTab={deleteMock}>
        <span> {title}</span>
      </LoideTab>
    );
    expect(baseElement).toBeDefined();
  });

  it("renders tab title", async () => {
    const key: number = 1;
    const title = `${SuffixNameTab}1`;
    const deleteMock = jest.fn();
    const { findByText } = render(
      <LoideTab tabkey={key} onDeleteTab={deleteMock}>
        <span> {title}</span>
      </LoideTab>
    );
    await findByText(title);
  });

  it("clicks delete tab button", async () => {
    const key: number = 1;
    const title = `${SuffixNameTab}1`;
    const deleteMock = jest.fn();

    const { findByTitle } = render(
      <LoideTab tabkey={key} onDeleteTab={deleteMock}>
        <span> {title}</span>
      </LoideTab>
    );

    const button = await findByTitle("Delete tab");
    fireEvent.click(button);
    expect(deleteMock).toHaveBeenCalledTimes(1);
  });
});
