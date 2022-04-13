import { ILanguageData } from "./LoideAPIInterfaces";

export interface EditorTabMap extends Record<number, ILoideTab> {}

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

export interface ILanguagesState {
  languages: ILanguageData[];
}

export interface IRunSettingsState {
  currentLanguage: string;
  currentSolver: string;
  currentExecutor: string;

  currentOptions: ISolverOption[];

  tabsIDToExecute: number[];

  runAuto: boolean;
}

export interface ILoideTab {
  title: string;
  type: string;
  value: string;
}

export interface IEditorState {
  tabCountID: number;
  currentTabIndex: number;
  tabs: EditorTabMap;
  tabsEditorSessions: any[];
  prevTabsSize: number;
}

export interface IOutputState {
  model: string;
  error: string;
}

export interface IUIStatusState {
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

export interface ISocketStatusState {
  connected: boolean;
}

export interface ILoideProject {
  language: string;
  solver: string;
  executor: string;
  options: ISolverOption[];

  tabsIDToExecute: number[];

  tabs: ILoideTab[];
  tabsID: number[];

  runAuto: boolean;
  outputError: string;
  outputModel: string;
}
