import { createSlice } from "@reduxjs/toolkit";
import { ISocketStatusState } from "../../lib/LoideInterfaces";

export const initialSocketStatusState: ISocketStatusState = {
    connected: false,
};

// A slice for recipes with our 3 reducers
const socketStatusSlice = createSlice({
    name: "socketStatus",
    initialState: initialSocketStatusState,
    reducers: {
        setConnected: (state, { payload }) => {
            state.connected = payload;
        },
    },
});

// Three actions generated from the slice
export const { setConnected } = socketStatusSlice.actions;

// A selector
export const socketStatusSelector = (state: {
    socketStatus: ISocketStatusState;
}) => state.socketStatus;

// The reducer
export default socketStatusSlice.reducer;
