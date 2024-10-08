import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRunSettingsState, ISolverOption } from "../../lib/LoideInterfaces";

export const initialRunSettingsState: IRunSettingsState = {
  currentLanguage: "",
  currentSolver: "",
  currentExecutor: "",
  currentOptions: [],
  runAuto: true,
  tabsIDToExecute: [],
};

// A slice for recipes with our 3 reducers
const runSettingsSlice = createSlice({
  name: "runSettings",
  initialState: initialRunSettingsState,
  reducers: {
    setAllRunSettings: (state, { payload }: PayloadAction<IRunSettingsState>) => {
      state = payload;
    },
    setCurrentLanguage: (state, { payload }: PayloadAction<string>) => {
      state.currentLanguage = payload;
    },
    setCurrentSolver: (state, { payload }: PayloadAction<string>) => {
      state.currentSolver = payload;
    },
    setCurrentExecutor: (state, { payload }: PayloadAction<string>) => {
      state.currentExecutor = payload;
    },
    setCurrentOptions: (state, { payload }: PayloadAction<ISolverOption[]>) => {
      state.currentOptions = payload;
    },
    setRunAuto: (state, { payload }: PayloadAction<boolean>) => {
      state.runAuto = payload;
    },
    setTabsIDToExecute: (state, { payload }: PayloadAction<number[]>) => {
      state.tabsIDToExecute = payload;
    },
  },
});

// Three actions generated from the slice
export const {
  setAllRunSettings,
  setCurrentLanguage,
  setCurrentSolver,
  setCurrentExecutor,
  setCurrentOptions,
  setRunAuto,
  setTabsIDToExecute,
} = runSettingsSlice.actions;

// Selectors
export const runSettingsSelector = (state: { runSettings: IRunSettingsState }) => state.runSettings;

export const currentLanguageSelector = (state: { runSettings: IRunSettingsState }) =>
  state.runSettings.currentLanguage;

// The reducer
export default runSettingsSlice.reducer;
