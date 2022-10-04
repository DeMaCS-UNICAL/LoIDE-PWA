import { useEffect } from "react";

type MouseClickEventType = "mousedown" | "mouseup" | "click" | "dblclick";

/**
 * Hook that fire callback when the mouse event is fired outside of the passed ref
 */
export const useOutsideMouseEvent = (
  ref: HTMLElement | null,
  callback?: () => void,
  eventType: MouseClickEventType = "click",
) => {
  useEffect(() => {
    /**
     * Fire callback if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref && event.target instanceof HTMLElement && !ref.contains(event.target)) {
        // Unbind the event listener
        document.removeEventListener(eventType, handleClickOutside);
        callback && callback();
      }
    }
    // Bind the event listener
    document.addEventListener(eventType, handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener(eventType, handleClickOutside);
    };
  }, [callback, ref]);
};

export default useOutsideMouseEvent;
