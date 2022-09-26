import { createSlice } from "@reduxjs/toolkit";
import { IUIStatusState } from "../../lib/LoideInterfaces";

export const initialUIStatusState: IUIStatusState = {
  connectingToTheServer: false,
  loadingFiles: false,
  darkMode: false,
  fontSizeEditor: 15,
  fontSizeOutput: 20,
  newOutput: false,
};

// A slice for recipes with our 3 reducers
const UIStatusSlice = createSlice({
  name: "uistatus",
  initialState: initialUIStatusState,
  reducers: {
    setConnectingToTheServer: (state, { payload }) => {
      state.connectingToTheServer = payload;
    },
    setLoadingFiles: (state, { payload }) => {
      state.loadingFiles = payload;
    },
    setDarkMode: (state, { payload }) => {
      state.darkMode = payload;
    },
    setFontSizeEditor: (state, { payload }) => {
      state.fontSizeEditor = payload;
    },
    setFontSizeOutput: (state, { payload }) => {
      state.fontSizeOutput = payload;
    },
    setNewOutput: (state, { payload }) => {
      state.newOutput = payload;
    },
  },
});

// Three actions generated from the slice
export const {
  setConnectingToTheServer,
  setLoadingFiles,
  setDarkMode,
  setFontSizeEditor,
  setFontSizeOutput,
  setNewOutput,
} = UIStatusSlice.actions;

// A selector
export const UIStatusSelector = (state: { UIStatus: IUIStatusState }) => state.UIStatus;

// The reducer
export default UIStatusSlice.reducer;
