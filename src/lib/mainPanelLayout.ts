export type MainPanelLayout = {
  sidebar: number;
  editor: number;
};

export const DEFAULT_MAIN_PANEL_LAYOUT: MainPanelLayout = {
  sidebar: 25,
  editor: 75,
};

export const SIDEBAR_MIN_SIZE = 15;
export const SIDEBAR_MAX_SIZE = 60;
export const EDITOR_MIN_SIZE = 45;

export const MAIN_LAYOUT_STORAGE_KEY = "react-resizable-panels:loide-main-layout";

export const isValidMainPanelLayout = (
  layout: Partial<MainPanelLayout>,
): layout is MainPanelLayout => {
  if (!layout || typeof layout !== "object") {
    return false;
  }

  if (typeof layout.sidebar !== "number" || typeof layout.editor !== "number") {
    return false;
  }

  if (!Number.isFinite(layout.sidebar) || !Number.isFinite(layout.editor)) {
    return false;
  }

  const sum = layout.sidebar + layout.editor;
  return (
    layout.sidebar >= SIDEBAR_MIN_SIZE &&
    layout.sidebar <= SIDEBAR_MAX_SIZE &&
    layout.editor >= EDITOR_MIN_SIZE &&
    Math.abs(sum - 100) < 0.5
  );
};

export const readMainPanelLayout = (
  storage: Pick<Storage, "getItem"> = localStorage,
): MainPanelLayout => {
  try {
    const storedLayout = storage.getItem(MAIN_LAYOUT_STORAGE_KEY);
    if (!storedLayout) {
      return DEFAULT_MAIN_PANEL_LAYOUT;
    }

    const parsedLayout = JSON.parse(storedLayout) as Partial<MainPanelLayout>;
    return isValidMainPanelLayout(parsedLayout) ? parsedLayout : DEFAULT_MAIN_PANEL_LAYOUT;
  } catch {
    return DEFAULT_MAIN_PANEL_LAYOUT;
  }
};

export const writeMainPanelLayout = (
  layout: MainPanelLayout,
  storage: Pick<Storage, "setItem"> = localStorage,
) => {
  storage.setItem(MAIN_LAYOUT_STORAGE_KEY, JSON.stringify(layout));
};
