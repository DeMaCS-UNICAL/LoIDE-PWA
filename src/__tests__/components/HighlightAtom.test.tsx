import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import HighlightAtom from "../../components/HighlightAtom";

describe("<HighlightAtom />", () => {
  it("renders without crashing", () => {
    const { baseElement } = render(<HighlightAtom text={"text"} highlight={"text text1 text2"} />);
    expect(baseElement).toBeDefined();
  });

  it("should not hightlight the text", async () => {
    const text = "test(1). test(2). hello(1). hello(2). test(3).";
    render(<HighlightAtom text={text} highlight="" />);
    const res = screen.getAllByText(text);
    expect(res.length).toBe(1);
  });

  it("should hightlight the text", async () => {
    const text = "test(1). test(2). hello(1). hello(2). test(3).";
    const highlight = "test";
    render(<HighlightAtom text={text} highlight={highlight} />);
    const res = screen.getAllByText(highlight);
    expect(res.length).toBe(3);
    fireEvent.click(res[0]);
    await waitFor(() => {
      expect(res.length).toBe(3);
    });
  });
});
