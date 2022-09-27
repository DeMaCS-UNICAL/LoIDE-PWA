import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitalTabCountID, SuffixNameTab } from "../../lib/constants";
import { EditorTabMap, IEditorState, ILoideTab } from "../../lib/LoideInterfaces";

export const initialTabs: EditorTabMap = {};
initialTabs[InitalTabCountID] = {
  title: `${SuffixNameTab}${InitalTabCountID}`,
  type: "",
  value: "",
};

export const initialEditorState: IEditorState = {
  tabCountID: InitalTabCountID,
  prevTabsSize: 0,
  currentTabIndex: 0,
  tabs: initialTabs,
  tabsEditorSessions: [],
};

// A slice for recipes with our 3 reducers
const editorSlice = createSlice({
  name: "editor",
  initialState: initialEditorState,
  reducers: {
    setAllEditorState: (state, { payload }: PayloadAction<IEditorState>) => {
      state.tabCountID = payload.tabCountID;
      state.prevTabsSize = payload.prevTabsSize;
      state.currentTabIndex = payload.currentTabIndex;
      state.tabs = payload.tabs;
      state.tabsEditorSessions = payload.tabsEditorSessions;
    },
    setTabCountID: (state, { payload }: PayloadAction<number>) => {
      state.tabCountID = payload;
    },
    setPrevTabsSize: (state, { payload }: PayloadAction<number>) => {
      state.prevTabsSize = payload;
    },
    setCurrentTab: (state, { payload }: PayloadAction<number>) => {
      state.currentTabIndex = payload;
    },
    setTabsEditorSessions: (state, { payload }: PayloadAction<any[]>) => {
      state.tabsEditorSessions = payload;
    },
    setAllTabs: (state, { payload }: PayloadAction<EditorTabMap>) => {
      state.tabs = payload;
    },
    addTab: (state, { payload }: PayloadAction<ILoideTab>) => {
      state.prevTabsSize = Object.keys(state.tabs).length;

      const nextID = state.tabCountID + 1;
      state.tabs[nextID] = payload;

      state.currentTabIndex = Object.keys(state.tabs).length - 1;
      state.tabCountID = nextID;
    },
    addNewTab: (state) => {
      state.prevTabsSize = Object.keys(state.tabs).length;

      const nextID = state.tabCountID + 1;
      state.tabs[nextID] = {
        title: `${SuffixNameTab}${nextID}`,
        type: "",
        value: "",
      };

      state.currentTabIndex = Object.keys(state.tabs).length - 1;
      state.tabCountID = nextID;
    },
    deleteTab: (state, { payload }: PayloadAction<number>) => {
      const shift = Object.keys(state.tabs).length - 1 === state.currentTabIndex ? true : false;
      state.currentTabIndex = shift ? state.currentTabIndex - 1 : state.currentTabIndex;
      delete state.tabs[payload];
      state.prevTabsSize = Object.keys(state.tabs).length;
    },
    selectTab: (state, { payload }: PayloadAction<number>) => {
      state.currentTabIndex = payload;
    },
    changeTabValue: (state, { payload }: PayloadAction<{ tabKey: number; value: string }>) => {
      const tab = state.tabs[payload.tabKey];
      if (tab) {
        tab.value = payload.value;
      }
    },
    changeTabName: (state, { payload }: PayloadAction<{ tabKey: number; name: string }>) => {
      const tab = state.tabs[payload.tabKey];
      if (tab) {
        tab.title = payload.name;
      }
    },
    duplicateTab: (state, { payload }: PayloadAction<number>) => {
      const tab = state.tabs[payload];
      if (tab) {
        const nextID = state.tabCountID + 1;

        state.prevTabsSize = Object.keys(state.tabs).length;

        state.tabs[nextID] = {
          title: `${SuffixNameTab}${nextID}`,
          type: tab.type,
          value: tab.value,
        };

        state.currentTabIndex = Object.keys(state.tabs).length - 1;
        state.tabCountID = nextID;
      }
    },
    clearTabValue: (state, { payload }: PayloadAction<number>) => {
      const tab = state.tabs[payload];
      if (tab) {
        tab.value = "";
      }
    },
    setTabIndex: (state, { payload }: PayloadAction<number>) => {
      state.currentTabIndex = payload;
    },
  },
});

// Three actions generated from the slice
export const {
  setAllEditorState,
  setTabCountID,
  setPrevTabsSize,
  setCurrentTab,
  setTabsEditorSessions,
  setAllTabs,
  addTab,
  addNewTab,
  deleteTab,
  selectTab,
  changeTabValue,
  changeTabName,
  duplicateTab,
  clearTabValue,
  setTabIndex,
} = editorSlice.actions;

// A selector
export const editorSelector = (state: { editor: IEditorState }) => state.editor;
export const tabsEditorSelector = (state: { editor: IEditorState }) => state.editor.tabs;

// The reducer
export default editorSlice.reducer;
