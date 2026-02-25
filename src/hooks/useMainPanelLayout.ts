import { useCallback, useEffect, useMemo, useRef } from "react";
import { useDefaultLayout, useGroupRef } from "react-resizable-panels";
import {
  isValidMainPanelLayout,
  MainPanelLayout,
  readMainPanelLayout,
} from "../lib/mainPanelLayout";

const MOBILE_LAYOUT = { editor: 100 };

/**
 * Manages resizable main editor layout persistence for desktop/mobile.
 *
 * Desktop: persists `sidebar` + `editor` panel sizes.
 * Mobile: persists only `editor` panel size while sidebar is hidden.
 *
 * It also guards against early mount/layout timing by restoring first,
 * then enabling layout change persistence.
 */
const useMainPanelLayout = (isMobile: boolean) => {
  const groupRef = useGroupRef();
  // Prevents initial mount callbacks from overwriting persisted layout.
  const hasRestoredLayoutRef = useRef(false);

  // Library persistence hook (storage key scoped by id + panelIds).
  const { defaultLayout, onLayoutChanged } = useDefaultLayout({
    id: "loide-main-layout",
    storage: localStorage,
    panelIds: isMobile ? ["editor"] : ["sidebar", "editor"],
  });

  // Derive the initial layout from saved hook state, with safe fallbacks.
  const initialLayout = useMemo(() => {
    if (isMobile) {
      const mobileLayout = (defaultLayout ?? {}) as Partial<typeof MOBILE_LAYOUT>;
      if (typeof mobileLayout.editor === "number" && Number.isFinite(mobileLayout.editor)) {
        return { editor: mobileLayout.editor };
      }

      return MOBILE_LAYOUT;
    }

    const layoutFromHook = defaultLayout as Partial<MainPanelLayout>;

    if (isValidMainPanelLayout(layoutFromHook)) {
      return {
        sidebar: layoutFromHook.sidebar,
        editor: layoutFromHook.editor,
      };
    }

    return readMainPanelLayout();
  }, [defaultLayout, isMobile]);

  // Restores the saved layout with retries to handle delayed panel mounting.
  const restoreLayoutWithRetry = useCallback(
    (targetLayout: MainPanelLayout | typeof MOBILE_LAYOUT) => {
      let frameId = 0;
      let attempts = 0;
      const maxAttempts = 20;

      const applyRestoredLayout = () => {
        const group = groupRef.current;

        if (!group) {
          attempts += 1;
          if (attempts < maxAttempts) {
            frameId = requestAnimationFrame(applyRestoredLayout);
          }
          return;
        }

        group.setLayout(targetLayout);

        const currentLayout = group.getLayout() as Partial<MainPanelLayout & typeof MOBILE_LAYOUT>;

        if (isMobile) {
          if (typeof currentLayout.editor === "number") {
            hasRestoredLayoutRef.current = true;
            return;
          }

          attempts += 1;
          if (attempts < maxAttempts) {
            frameId = requestAnimationFrame(applyRestoredLayout);
          } else {
            hasRestoredLayoutRef.current = true;
          }
          return;
        }

        const desktopTargetLayout = targetLayout as MainPanelLayout;

        if (isValidMainPanelLayout(currentLayout)) {
          const sidebarDiff = Math.abs(currentLayout.sidebar - desktopTargetLayout.sidebar);
          const editorDiff = Math.abs(currentLayout.editor - desktopTargetLayout.editor);

          if (sidebarDiff < 0.5 && editorDiff < 0.5) {
            hasRestoredLayoutRef.current = true;
            return;
          }
        }

        attempts += 1;
        if (attempts < maxAttempts) {
          frameId = requestAnimationFrame(applyRestoredLayout);
        } else {
          hasRestoredLayoutRef.current = true;
        }
      };

      frameId = requestAnimationFrame(applyRestoredLayout);

      return () => {
        cancelAnimationFrame(frameId);
      };
    },
    [groupRef, isMobile],
  );

  // Run one-time restore before allowing persistence updates.
  useEffect(() => {
    if (hasRestoredLayoutRef.current) {
      return;
    }

    return restoreLayoutWithRetry(initialLayout as MainPanelLayout | typeof MOBILE_LAYOUT);
  }, [initialLayout, restoreLayoutWithRetry]);

  // Persist changes only after restore is complete.
  const handleLayoutChanged = useCallback(
    (nextLayout: Partial<MainPanelLayout>) => {
      if (!hasRestoredLayoutRef.current) {
        return;
      }

      if (isMobile) {
        onLayoutChanged(nextLayout);
        return;
      }

      if (!isValidMainPanelLayout(nextLayout)) {
        return;
      }

      onLayoutChanged(nextLayout);
    },
    [isMobile, onLayoutChanged],
  );

  return {
    groupRef,
    initialLayout,
    handleLayoutChanged,
  };
};

export default useMainPanelLayout;
