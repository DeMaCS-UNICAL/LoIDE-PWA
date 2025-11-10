import { fireEvent, renderHook, waitFor } from "@testing-library/react";
import useOutsideMouseEvent from "../../hooks/useOutsideMouseEvent";
import { vi } from "vitest";

describe("hook - useOutsideMouseEvent", () => {
  it("renders without crashing", () => {
    const callback = vi.fn();
    renderHook(() => useOutsideMouseEvent(document.createElement("div"), callback));
  });

  it("should fire the callback event", async () => {
    const callback = vi.fn();
    renderHook(() => useOutsideMouseEvent(document.createElement("div"), callback));
    fireEvent.click(document.body);
    await waitFor(() => {
      expect(callback).toHaveBeenCalled();
    });
  });
});
