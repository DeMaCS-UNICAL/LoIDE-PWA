import { Store } from "pullstate";
import { InitalTabCountID, SuffixNameTab } from "./constants";
import {
    ILanguagesStore,
    ILoideTab,
    IEditorStore,
    IRunSettingsStore,
    IOutputStore,
    IUIStatusStore,
    ISocketStatusStore,
} from "./LoideInterfaces";

export const initialLanguagesDataStore: ILanguagesStore = {
    languages: [],
};
export const LanguagesDataStore = new Store<ILanguagesStore>(
    initialLanguagesDataStore
);

export const initialRunSettingsStore: IRunSettingsStore = {
    currentLanguage: "",
    currentSolver: "",
    currentExecutor: "",
    currentOptions: [],
    runAuto: false,
    IDTabsToExecute: [],
};
export const RunSettingsStore = new Store<IRunSettingsStore>(
    initialRunSettingsStore
);

export const initialTabs = new Map<number, ILoideTab>().set(InitalTabCountID, {
    title: `${SuffixNameTab}${InitalTabCountID}`,
    type: "",
    value: "",
});
export const initialEditorStore: IEditorStore = {
    tabCountID: InitalTabCountID,
    prevTabsSize: 0,
    currentTab: 0,
    tabs: new Map<number, ILoideTab>(initialTabs),
};
export const EditorStore = new Store<IEditorStore>(initialEditorStore);

export const initialOutputStore: IOutputStore = {
    model: "",
    error: "",
};
export const OutputStore = new Store<IOutputStore>(initialOutputStore);

export const initialUIStatusStore: IUIStatusStore = {
    connectingToTheServer: false,
    loadingFiles: false,
    darkMode: false,
    fontSizeEditor: 15,
    fontSizeOutput: 20,
    newOutput: false,
};
export const UIStatusStore = new Store<IUIStatusStore>(initialUIStatusStore);

export const initialSocketStatusStore: ISocketStatusStore = {
    connected: false,
};
export const SocketStatusStore = new Store<ISocketStatusStore>(
    initialSocketStatusStore
);
