import {
  IExecutorData,
  ILanguageData,
  ILoideRunData,
  IOptionsData,
  ISolverData,
} from "./LoideAPIInterfaces";
import { toastController } from "@ionic/core";
import { EditorTabMap, ILoideProject, ILoideTab, ISolverOption } from "./LoideInterfaces";
import {
  InitalTabCountID,
  LocalStorageItems,
  SuffixNameTab,
  Toast,
  ValuesNotSupported,
} from "./constants";
import { store } from "../redux";
import {
  initialUIStatusState,
  setDarkMode,
  setFontSizeEditor,
  setFontSizeOutput,
  setLoadingFiles,
  setNewOutput,
} from "../redux/slices/UIStatus";
import { initialOutputState, setAllOutput } from "../redux/slices/Output";
import {
  initialRunSettingsState,
  setAllRunSettings,
  setCurrentExecutor,
  setCurrentLanguage,
  setCurrentOptions,
  setCurrentSolver,
  setRunAuto,
  setTabsIDToExecute,
} from "../redux/slices/RunSettings";
import {
  addNewTab,
  changeTabName,
  changeTabValue,
  clearTabValue,
  deleteTab,
  duplicateTab,
  initialEditorState,
  selectTab,
  setAllEditorState,
  setAllTabs,
  setTabCountID,
  setTabIndex,
} from "../redux/slices/Editor";

const isJSON = (str: string) => {
  try {
    JSON.parse(str);
  } catch {
    return false;
  }
  return true;
};

const hasRightProperty = (config: any): boolean => {
  if (
    "language" in config &&
    "solver" in config &&
    "executor" in config &&
    "options" in config &&
    "tabsIDToExecute" in config &&
    "tabs" in config &&
    "tabsID" in config &&
    "runAuto" in config &&
    "outputModel" in config &&
    "outputError" in config
  ) {
    return true;
  }

  return false;
};

const generateGeneralToast = async (
  message: string,
  headerMessage: string,
  color: string,
  duration?: number,
) => {
  await toastController
    .create({
      position: "top",
      header: headerMessage,
      message: message,
      color: color,
      duration: duration !== undefined ? duration : 3000,
      buttons: ["OK"],
    })
    .then((toast) => {
      toast.present();
    });
};

const canSetLanguage = (language: string, languages: ILanguageData[]): boolean => {
  const found: boolean = languages.some((lang) => {
    return lang.value === language;
  });

  return found;
};

const getExecutorsBySolversAndByLanguage = (
  solver: string,
  language: string,
  languages: ILanguageData[],
): IExecutorData[] => {
  const solvers: ISolverData[] = getSolversByLanguage(language, languages);

  for (const sol of solvers) {
    if (sol.value === solver) {
      return sol.executors;
    }
  }

  return new Array<IExecutorData>();
};

const getOptionsAvaliabeBySolverAndByLanguage = (
  solver: string,
  language: string,
  languages: ILanguageData[],
): IOptionsData[] => {
  const solvers: ISolverData[] = getSolversByLanguage(language, languages);

  for (const sol of solvers) {
    if (sol.value === solver) {
      if (sol.options) return sol.options;
      else {
        return new Array<IOptionsData>();
      }
    }
  }

  return new Array<IOptionsData>();
};

const getSolversByLanguage = (language: string, languages: ILanguageData[]): ISolverData[] => {
  for (const lang of languages) {
    if (lang.value === language) {
      return lang.solvers;
    }
  }
  return new Array<ISolverData>();
};

const canSetSolver = (
  solverToFind: string,
  language: string,
  totalLanguages: ILanguageData[],
): boolean => {
  const solvers: ISolverData[] = getSolversByLanguage(language, totalLanguages);

  if (solvers.length === 0) return false;

  const found: boolean = solvers.some((sol) => {
    return sol.value === solverToFind;
  });

  return found;
};

const canSetExecutor = (
  executorToFind: string,
  solver: string,
  language: string,
  totalLanguages: ILanguageData[],
): boolean => {
  const executors: IExecutorData[] = getExecutorsBySolversAndByLanguage(
    solver,
    language,
    totalLanguages,
  );

  if (executors.length === 0) return false;

  for (const exe of executors) {
    if (exe.value === executorToFind) return true;
  }

  return false;
};

const canSetOption = (
  option: ISolverOption,
  solver: string,
  language: string,
  totalLanguages: ILanguageData[],
): boolean => {
  const optionsAvailable = getOptionsAvaliabeBySolverAndByLanguage(
    solver,
    language,
    totalLanguages,
  );

  for (const opt of optionsAvailable) {
    if (opt.value === option.name) return true;
  }

  return false;
};

const getPropName = (obj: any) =>
  new Proxy(obj, {
    get(_, key) {
      return key;
    },
  });

const isClipboardReadSupported = (): boolean => {
  try {
    return typeof navigator?.clipboard?.readText === "undefined" ? false : true;
  } catch {
    return false;
  }
};

const isClipboardWriteSupported = (): boolean => {
  try {
    return typeof navigator?.clipboard?.writeText === "undefined" ? false : true;
  } catch {
    return false;
  }
};

const getTextFromClipboard = (callback: (text: string) => void): void => {
  if (isClipboardReadSupported()) {
    navigator.clipboard
      .readText()
      .then((text) => {
        callback(text);
      })
      .catch((err) => {
        // error because maybe the user didn't grant access to read from clipboard
        Utils.generateGeneralToast(
          Toast.ClipboardError.message,
          Toast.ClipboardError.header,
          "danger",
        );
        console.error(err);
      });
  } else
    Utils.generateGeneralToast(
      Toast.ClipboardIsNotSupported.message,
      Toast.ClipboardIsNotSupported.header,
      "danger",
    );
};

const copyTextToClipboard = (
  text: string,
  callbackSuccess?: () => void,
  callbackError?: () => void,
) => {
  if (isClipboardWriteSupported()) {
    navigator.clipboard.writeText(text).then(callbackSuccess, callbackError);
  }
};

const downloadTextFile = (title: string, text: string) => {
  const element = document.createElement("a");
  const file = new Blob([text], {
    type: "text/plain",
  });
  element.href = URL.createObjectURL(file);
  element.download = title;
  document.body.appendChild(element);
  element.click();
};

const resetInput = () => {
  store.dispatch(setAllEditorState(initialEditorState));
};

const addEditorTab = () => {
  store.dispatch(addNewTab());
};

const deleteEditorTab = (tabKey: number) => {
  store.dispatch(deleteTab(tabKey));
};

const selectEditorTab = (index: number) => {
  store.dispatch(selectTab(index));
};

const changeEditorTabValue = (tabKey: number, value: string) => {
  store.dispatch(changeTabValue({ tabKey, value }));
};

const changeTabEditorName = (tabKey: number, name: string) => {
  store.dispatch(changeTabName({ tabKey, name }));
};

const duplicateEditorTab = (tabKey: number) => {
  store.dispatch(duplicateTab(tabKey));
};

const clearEditorTabValue = (tabKey: number) => {
  store.dispatch(clearTabValue(tabKey));
};

const saveTabContent = (tab: ILoideTab) => {
  downloadTextFile(tab.title, tab.value);
};

const resetProject = () => {
  store.dispatch(setAllRunSettings(initialRunSettingsState));

  Utils.Editor.resetInput();

  store.dispatch(setAllOutput(initialOutputState));
};

const createTabsFromArray = (textTabs: string[]) => {
  const newTabs: EditorTabMap = {};
  let indexTab = InitalTabCountID;
  textTabs.forEach((text) => {
    newTabs[indexTab] = {
      title: `${SuffixNameTab}${indexTab}`,
      type: "",
      value: text,
    };
    indexTab++;
  });

  store.dispatch(setTabCountID(indexTab));
  store.dispatch(setAllTabs(newTabs));

  store.dispatch(setLoadingFiles(false));

  if (Object.keys(newTabs).length > 1) {
    Utils.generateGeneralToast(
      Toast.MoreFileOpenedSuccessfully.message,
      Toast.MoreFileOpenedSuccessfully.header,
      "success",
    );
  } else {
    Utils.generateGeneralToast(
      Toast.SingleFileOpenedSuccessfully.message,
      Toast.SingleFileOpenedSuccessfully.header,
      "success",
    );
  }
};

const setProjectFromConfig = (
  config: any,
  languages: ILanguageData[],
  onFinishCallback?: (done: boolean) => void,
) => {
  if (Utils.hasRightProperty(config)) {
    const project: ILoideProject = config;

    const valuesNotSupported: string[] = [];
    const optionsSupported: ISolverOption[] = [];
    let optionsNotSupported = false;

    // set the current language
    if (Utils.canSetLanguage(project.language, languages)) {
      store.dispatch(setCurrentLanguage(project.language));

      // set the current solver
      if (Utils.canSetSolver(project.solver, project.language, languages)) {
        store.dispatch(setCurrentSolver(project.solver));

        // set the current executor
        if (Utils.canSetExecutor(project.executor, project.solver, project.language, languages)) {
          store.dispatch(setCurrentExecutor(project.executor));
        } else {
          valuesNotSupported.push(ValuesNotSupported.Executor);
        }
      } else {
        valuesNotSupported.push(ValuesNotSupported.Solver);
        valuesNotSupported.push(ValuesNotSupported.Executor);
      }
    } else {
      valuesNotSupported.push(ValuesNotSupported.Language);
      valuesNotSupported.push(ValuesNotSupported.Solver);
      valuesNotSupported.push(ValuesNotSupported.Executor);
    }

    for (const option of project.options) {
      if (Utils.canSetOption(option, project.solver, project.language, languages))
        optionsSupported.push(option);
      else optionsNotSupported = true;
    }

    // set the ID tabs to execute, the options supported and the runAuto option
    store.dispatch(setCurrentOptions(optionsSupported));
    store.dispatch(setTabsIDToExecute(project.tabsIDToExecute));
    store.dispatch(setRunAuto(project.runAuto));

    // set the tabs and their IDs
    const newTabs: EditorTabMap = {};

    project.tabs.forEach((program, index) => {
      newTabs[project.tabsID[index]] = {
        title: program.title,
        type: program.type,
        value: program.value,
      };
    });

    store.dispatch(setTabIndex(0));
    store.dispatch(setTabCountID(project.tabsID[project.tabsID.length - 1]));
    store.dispatch(setAllTabs(newTabs));

    // set the output
    store.dispatch(
      setAllOutput({
        model: project.outputModel,
        error: project.outputError,
      }),
    );

    if (valuesNotSupported.length > 0) {
      Utils.generateGeneralToast(
        `${
          Toast.ProjectNotOpenedProperly.message.TheFollowingValuesCannotBeSetted
        }\n<b>${valuesNotSupported.join(",\n")}\n${
          optionsNotSupported
            ? `<br>${Toast.ProjectNotOpenedProperly.message.FoundSolverOptions}`
            : ""
        } <b/>`,
        Toast.ProjectNotOpenedProperly.header,
        "warning",
        10000,
      );

      if (onFinishCallback) onFinishCallback(true);
    } else if (optionsNotSupported) {
      Utils.generateGeneralToast(
        Toast.ProjectNotOpenedProperly.message.FoundSolverOptionsIncompatibilitySolverLoaded,
        Toast.ProjectNotOpenedProperly.header,
        "warning",
        7000,
      );
      if (onFinishCallback) onFinishCallback(true);
    } else {
      Utils.generateGeneralToast(
        Toast.ProjectOpenedSuccessfully.message,
        Toast.ProjectOpenedSuccessfully.header,
        "success",
      );
      if (onFinishCallback) onFinishCallback(true);
    }
  } else {
    Utils.generateGeneralToast(
      Toast.ConfigProjectNotRecognized.message,
      Toast.ConfigProjectNotRecognized.header,
      "danger",
    );
    if (onFinishCallback) onFinishCallback(false);
  }

  store.dispatch(setLoadingFiles(false));
};

const resetAppearanceOptions = () => {
  const darkModeMatches = window.matchMedia("(prefers-color-scheme: dark)").matches;

  store.dispatch(setFontSizeEditor(initialUIStatusState.fontSizeEditor));
  store.dispatch(setFontSizeOutput(initialUIStatusState.fontSizeOutput));
  store.dispatch(setDarkMode(darkModeMatches));

  localStorage.setItem(LocalStorageItems.darkMode, "");
  localStorage.setItem(LocalStorageItems.fontSizeEditor, "");
  localStorage.setItem(LocalStorageItems.fontSizeOutput, "");
};

const removeNewOutputBadge = () => {
  store.dispatch(setNewOutput(false));
};

const addNewOutputBadge = () => {
  store.dispatch(setNewOutput(true));
};

const restoreAppearanceFromLocalStorage = () => {
  const darkMode = localStorage.getItem(LocalStorageItems.darkMode);
  if (darkMode) {
    store.dispatch(setDarkMode(darkMode === "true"));
  }

  const fontEditor = localStorage.getItem(LocalStorageItems.fontSizeEditor);
  if (fontEditor) {
    store.dispatch(setFontSizeEditor(Number(fontEditor)));
  }

  const fontOutput = localStorage.getItem(LocalStorageItems.fontSizeOutput);
  if (fontOutput) {
    store.dispatch(setFontSizeOutput(Number(fontOutput)));
  }
};

const restoreRunAutoFromLocalStorage = () => {
  const runAuto = localStorage.getItem(LocalStorageItems.runAuto);
  if (runAuto) {
    store.dispatch(setRunAuto(runAuto === "true"));
  }
};

const getLoideRunData = (): ILoideRunData => {
  const runSettings = store.getState().runSettings;

  const editorTabs = store.getState().editor.tabs;
  const editorTabIndex = store.getState().editor.currentTabIndex;

  const data: ILoideRunData = {} as ILoideRunData;
  data.language = runSettings.currentLanguage;
  data.engine = runSettings.currentSolver;
  data.executor = runSettings.currentExecutor;

  if (runSettings.currentOptions.length === 0) {
    data.option = [{ name: "", value: [""] }];
  } else {
    for (const option of runSettings.currentOptions) {
      data.option = [];
      if (!option.disabled)
        data.option.push({
          name: option.name,
          value: option.values,
        });
    }
  }

  data.program = [];

  if (runSettings.tabsIDToExecute.length === 0) {
    const program = editorTabs[editorTabIndex + 1].value;
    if (program !== undefined) {
      data.program.push(program);
    }
  } else {
    for (const tabID of runSettings.tabsIDToExecute) {
      const program = editorTabs[tabID].value;
      if (program !== undefined) {
        data.program.push(program);
      }
    }
  }

  return data;
};

const getLoideProjectData = (): ILoideProject => {
  const runSettings = store.getState().runSettings;

  const editorTabs = store.getState().editor.tabs;
  const output = store.getState().output;

  const data: ILoideProject = {} as ILoideProject;

  data.language = runSettings.currentLanguage;
  data.solver = runSettings.currentSolver;
  data.executor = runSettings.currentExecutor;

  data.options = runSettings.currentOptions;

  data.tabsIDToExecute = runSettings.tabsIDToExecute;

  data.tabs = Object.values(editorTabs);
  data.tabsID = Object.keys(editorTabs).map((item) => Number(item));

  data.runAuto = runSettings.runAuto;

  data.outputModel = output.model;
  data.outputError = output.error;

  return data;
};

const getProjectFromLocalStorage = (): ILoideProject | undefined => {
  const projectString = localStorage.getItem(LocalStorageItems.loideProject);
  let project: ILoideProject | undefined;
  if (projectString) {
    try {
      project = JSON.parse(projectString);
    } catch {
      project = undefined;
    }
  }
  return project;
};

const isValidProjectToLoad = (project: ILoideProject): boolean => {
  if (project.tabs.length > 1 || project.tabs[0].value.trim().length > 0) return true;
  return false;
};

const getRandomColor = () => Math.floor(Math.random() * 16777215).toString(16);

const Editor = {
  resetInput,
  addTab: addEditorTab,
  deleteTab: deleteEditorTab,
  selectTab: selectEditorTab,
  changeTabValue: changeEditorTabValue,
  changeTabName: changeTabEditorName,
  duplicateTab: duplicateEditorTab,
  clearTabValue: clearEditorTabValue,
  saveTabContent,
};

const Utils = {
  Editor,
  isJSON,
  hasRightProperty,
  canSetLanguage,
  generateGeneralToast,
  getPropName,
  getLoideRunData,
  getLoideProjectData,
  getProjectFromLocalStorage,
  canSetSolver,
  canSetExecutor,
  canSetOption,
  isClipboardReadSupported,
  isClipboardWriteSupported,
  getTextFromClipboard,
  downloadTextFile,
  resetProject,
  copyTextToClipboard,
  createTabsFromArray,
  setProjectFromConfig,
  resetAppearanceOptions,
  removeNewOutputBadge,
  addNewOutputBadge,
  restoreAppearanceFromLocalStorage,
  restoreRunAutoFromLocalStorage,
  isValidProjectToLoad,
  getRandomColor,
};

export default Utils;
