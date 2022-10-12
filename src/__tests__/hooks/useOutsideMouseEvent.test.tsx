import { fireEvent, renderHook, waitFor } from "@testing-library/react";
import useOutsideMouseEvent from "../../hooks/useOutsideMouseEvent";

describe("hook - useOutsideMouseEvent", () => {
  it("renders without crashing", () => {
    const callback = jest.fn();
    renderHook(() => useOutsideMouseEvent(document.createElement("div"), callback));
  });

  it("should fire the callback event", async () => {
    const callback = jest.fn();
    renderHook(() => useOutsideMouseEvent(document.createElement("div"), callback));
    fireEvent.click(document.body);
    await waitFor(() => {
      expect(callback).toHaveBeenCalled();
    });
  });
});
