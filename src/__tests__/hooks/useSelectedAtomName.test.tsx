import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react";
import { afterEach, vi } from "vitest";
import useSelectedAtomName from "../../hooks/useSelectedAtomName";

describe("hook - useSelectedAtomName", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    const selection = window.getSelection();
    selection?.removeAllRanges();
    document.body.innerHTML = "";
  });

  it("renders without crashing", () => {
    renderHook(() => useSelectedAtomName());
  });

  it("should give the selected atom name", async () => {
    const { result, rerender } = renderHook(() => useSelectedAtomName());

    expect(result.current.atomNameSelected).toBe("");

    const seletion = window.getSelection();

    expect(seletion).toBeTruthy();

    const element = document.createElement("span");
    element.textContent = "ciao";

    document.body.appendChild(element);

    const range = document.createRange();
    range.selectNode(element);

    seletion?.addRange(range);

    act(() => result.current.updateSelectedText());

    rerender();

    await waitFor(() => {
      expect(result.current.atomNameSelected).toBe("ciao");
    });
  });

  it("should reset the selected atom name", async () => {
    const { result, rerender } = renderHook(() => useSelectedAtomName());

    expect(result.current.atomNameSelected).toBe("");

    const seletion = window.getSelection();

    expect(seletion).toBeTruthy();

    const element = document.createElement("span");
    element.textContent = "ciao";

    document.body.appendChild(element);

    const range = document.createRange();
    range.selectNode(element);

    seletion?.addRange(range);

    act(() => result.current.updateSelectedText());

    rerender();

    await waitFor(() => {
      expect(result.current.atomNameSelected).toBe("ciao");
    });

    act(() => result.current.resetSelection());

    await waitFor(() => {
      expect(result.current.atomNameSelected).toBe("");
    });
  });

  it("should return empty string as atom name with invalid select", async () => {
    const { result, rerender } = renderHook(() => useSelectedAtomName());

    expect(result.current.atomNameSelected).toBe("");

    const seletion = window.getSelection();

    expect(seletion).toBeTruthy();

    seletion?.removeAllRanges();

    const element = document.createElement("span");
    element.textContent = "3242423423";

    document.body.appendChild(element);

    const range = document.createRange();
    range.selectNode(element);

    seletion?.addRange(range);

    act(() => result.current.updateSelectedText());

    rerender();

    await waitFor(() => {
      expect(result.current.atomNameSelected).toBe("");
    });
  });

  it("should return empty string as atom name when selection is not supported", async () => {
    vi.spyOn(window, "getSelection").mockReturnValue(null);
    const { result } = renderHook(() => useSelectedAtomName());
    expect(result.current.atomNameSelected).toBe("");
    act(() => result.current.updateSelectedText());
    await waitFor(() => {
      expect(result.current.atomNameSelected).toBe("");
    });
  });
});
