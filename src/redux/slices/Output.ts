import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOutputState } from "../../lib/LoideInterfaces";

export const initialOutputState: IOutputState = {
  model: "",
  error: "",
};

// A slice for recipes with our 3 reducers
const outputSlice = createSlice({
  name: "output",
  initialState: initialOutputState,
  reducers: {
    setModel: (state, { payload }) => {
      state.model = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setAllOutput: (state, action: PayloadAction<IOutputState>) => {
      state.model = action.payload.model;
      state.error = action.payload.error;
    },
    setEmpty: (state) => {
      state.model = "";
      state.error = "";
    },
  },
});

// Three actions generated from the slice
export const { setModel, setError, setEmpty, setAllOutput } =
  outputSlice.actions;

// A selector
export const outputSelector = (state: { output: IOutputState }) => state.output;

// The reducer
export default outputSlice.reducer;
