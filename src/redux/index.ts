import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import EditorReducer from "./slices/Editor";
import RunSettingsReducer from "./slices/RunSettings";
import LanguagesDataReducer from "./slices/LanguagesData";
import OutputReducer from "./slices/Output";
import SocketStatusReducer from "./slices/SocketStatus";
import UIStatusReducer from "./slices/UIStatus";

const rootReducer = combineReducers({
    UIStatus: UIStatusReducer,
    socketStatus: SocketStatusReducer,
    languagesData: LanguagesDataReducer,
    runSettings: RunSettingsReducer,
    editor: EditorReducer,
    output: OutputReducer,
});

export const store = configureStore({ reducer: rootReducer });
