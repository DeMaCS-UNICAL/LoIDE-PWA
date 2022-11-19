export const LoidePath = {
  Editor: "editor",
  RunSettings: "run-settings",
  Output: "output",
  About: "about",
  Appearance: "appearance",
  Examples : "example",
};

export const APIWSEvents = {
  emit: {
    run: "run",
    getLanguages: "getLanguages",
  },
  on: {
    connectError: "connect_error",
    problem: "problem",
    output: "output",
    languages: "languages",
  },
};

export const APIURLShortening = "https://is.gd/create.php?format=json&url=";

export const SuffixNameTab = "L P ";

export const ValuesNotSupported = {
  Language: "• Language",
  Solver: "• Solver",
  Executor: "• Executor",
};
export const Errors = {
  ConnectionError:
    "Unable to connect to the server, maybe you or the server are offline.\nTry it later.",
  RunConnectError: "Falied to run the project. Maybe the server or you are offline.\nTry it later.",
  GetLanguagesError:
    "Falied to get the languages. Maybe the server or you are offline.\nTry it later.",
};

export const Toast = {
  SingleFileOpenedSuccessfully: {
    header: "File opened successfully.",
    message: "",
  },
  MoreFileOpenedSuccessfully: {
    header: "Files opened successfully.",
    message: "",
  },
  ProjectOpenedSuccessfully: {
    header: "Project opened successfully.",
    message: "",
  },
  ProjectNotOpenedProperly: {
    header: "Project not opened properly",
    message: {
      TheFollowingValuesCannotBeSetted: "The following values cannot be set:",
      FoundSolverOptions: "Found solver options that cannot be set due above.",
      FoundSolverOptionsIncompatibilitySolverLoaded:
        "Found solver options that cannot be set due the incompatibility of the solver loaded.",
    },
  },
  ConfigProjectNotRecognized: {
    header: "Config project not recognized",
    message: "Error open the config project",
  },
  ErrorOpenFile: {
    header: "Error open file",
    message: {
      FileReadingWasAborted: "File reading was aborted",
      FileReadingHasFailed: "File reading has failed",
    },
  },
  ErrorLinkGeneration: {
    header: "Error link generation",
    message: {
      TheProjectIsTooLong: "The project is too long to be shared",
      TryItLater: "Try it later",
    },
  },
  LinkCopiedSuccessfully: {
    header: "Link copied successfully",
    message: "",
  },
  CannotCopyTheLink: {
    header: "Cannot copy the link",
    message: "",
  },
  ExecutionError: {
    header: "Execution error",
    message: "",
  },
  Error: {
    header: "Error",
    message: "",
  },
  ClipboardIsNotSupported: {
    header: "Clipboard error",
    message: "Clipboard is not supported",
  },
  ClipboardError: {
    header: "Clipboard error",
    message: "Clipboard read error, maybe you didn't grant the access to read from the clipboard",
  },
};

export const ButtonText = {
  OK: "OK",
  Cancel: "Cancel",
  ResetInput: "Reset input",
  ResetProject: "Reset project",
  Rename: "Rename",
  Delete: "Delete",
  Duplicate: "Duplicate",
  ClearContent: "Clear content",
  SaveContent: "Save content",
  Restore: "Restore",
};

export const LocalStorageItems = {
  darkMode: "darkMode",
  fontSizeEditor: "fontSizeEditor",
  fontSizeOutput: "fontSizeOutput",
  runAuto: "runAuto",
  loideProject: "loideProject",
};

export const ActionSheet = {
  Reset: "Reset actions",
  Tab: "Tab actions",
};

export const URLInput = {
  Error: "Ops. Something went wrong",
  Loading: "Loading...",
};

export const WindowConfirmMessages = {
  DeleteTab: {
    header: "Delete tab",
    message: "Are you sure want to delete this tab? This cannot be undone.",
  },
  ResetInput: {
    header: "Reset input",
    message: "This operation will delete all the tabs. This cannot be undone.",
  },
  ResetProject: {
    header: "Reset project",
    message:
      "This operation will reset all the run settings, the project input and output. This cannot be undone.",
  },
  RenameTab: {
    header: "Rename tab",
    message: "",
  },
  RestoreProject: {
    header: "Restore project",
    message: "Project found. Maybe you were working on a project.\nDo you wish to restore it? ",
  },
};

export const Inputs = {
  RenameTab: { name: "rename", placeholder: "Insert a name" },
};

export const LoideLanguages = {
  ASP: { name: "asp", highlightSupport: true, runAutoSupported: true },
  DATALOG: {
    name: "datalog",
    highlightSupport: true,
    runAutoSupported: true,
  },
};

export const LoideSolvers = {
  DLV: "dlv",
  DLV2: "dlv2",
  Clingo: "clingo",
  IDLV: "idlv",
};

export const InitalTabCountID = 1;

export const OutputPositions = {
  right: "right",
  bottom: "bottom",
  disabled: "disabled",
};
export const CurrentTab = "current-tab";
export const AllTabs = "all-tabs";

export const screenBreakpoints = {
  extraSmall: 576,
  small: 768,
  medium: 992,
  large: 1200,
};

export const defaultProjectName = "LoIDE_Project";
