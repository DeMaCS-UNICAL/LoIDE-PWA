import { ILanguageData } from "./LoideAPIInterfaces";

export interface ISolverOption {
    id: number;
    name: string;
    values: string[];
    disabled: boolean;
}

export interface ModalProps {
    show: boolean;
    onHide: () => void;
}

export interface IToggleItem {
    toggle: (newStatus: boolean) => void;
    show: boolean;
}

export interface ILanguagesStore {
    languages: ILanguageData[];
}

export interface IRunSettingsStore {
    currentLanguage: string;
    currentSolver: string;
    currentExecutor: string;

    currentOptions: ISolverOption[];

    IDTabsToExecute: number[];

    runAuto: boolean;
}

export interface ILoideTab {
    title: string;
    type: string;
    value: string;
}

export interface IEditorStore {
    tabCountID: number;
    currentTab: number;
    tabs: Map<number, ILoideTab>;
    prevTabsSize: number;
}

export interface IOutputStore {
    model: string;
    error: string;
}

export interface IUIStatusStore {
    connectingToTheServer: boolean;
    loadingFiles: boolean;
    darkMode: boolean;
    fontSizeEditor: number;
    fontSizeOutput: number;
    newOutput: boolean;
}

export interface IDimensions {
    width: number;
    height: number;
}

export interface ISocketStatusStore {
    connected: boolean;
}

export interface ILoideProject {
    language: string;
    solver: string;
    executor: string;
    options: ISolverOption[];

    IDTabsToExecute: number[];

    tabs: ILoideTab[];
    IDTabs: number[];

    runAuto: boolean;
    outputError: string;
    outputModel: string;
}
