import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILanguageData } from "../../lib/LoideAPIInterfaces";
import { ILanguagesState } from "../../lib/LoideInterfaces";

export const initialLanguagesDataState: ILanguagesState = {
  languages: [],
};

// A slice for recipes with our 3 reducers
const languagesDataSlice = createSlice({
  name: "languagesData",
  initialState: initialLanguagesDataState,
  reducers: {
    setLanguages: (state, { payload }: PayloadAction<ILanguageData[]>) => {
      state.languages = payload;
    },
  },
});

// Three actions generated from the slice
export const { setLanguages } = languagesDataSlice.actions;

// A selector
export const languagesDataSelector = (state: { languagesData: ILanguagesState }) =>
  state.languagesData;

// The reducer
export default languagesDataSlice.reducer;
