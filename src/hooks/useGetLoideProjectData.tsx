import { useEffect, useState } from "react";

import { RunSettingsStore, EditorStore, OutputStore } from "../lib/store";
import { ILoideProject } from "../lib/LoideInterfaces";

export const useGetLoideProjectData = (): ILoideProject => {
    const currentLanguage = RunSettingsStore.useState((s) => s.currentLanguage);
    const currentSolver = RunSettingsStore.useState((s) => s.currentSolver);
    const currentExecutor = RunSettingsStore.useState((s) => s.currentExecutor);

    const currentOptions = RunSettingsStore.useState((s) => s.currentOptions);
    const IDTabsToExecute = RunSettingsStore.useState((s) => s.IDTabsToExecute);

    const tabs = EditorStore.useState((e) => e.tabs);

    const runAuto = RunSettingsStore.useState((s) => s.runAuto);

    const outputModel = OutputStore.useState((o) => o.model);
    const outputError = OutputStore.useState((o) => o.error);

    const [loideData, setLoideData] = useState<ILoideProject>(
        {} as ILoideProject
    );

    useEffect(() => {
        let data: ILoideProject = {} as ILoideProject;

        data.language = currentLanguage;
        data.solver = currentSolver;
        data.executor = currentExecutor;

        data.options = currentOptions;

        data.IDTabsToExecute = IDTabsToExecute;

        data.tabs = [...tabs.values()];
        data.IDTabs = [...tabs.keys()];

        data.runAuto = runAuto;

        data.outputModel = outputModel;
        data.outputError = outputError;

        setLoideData(data);
    }, [
        currentLanguage,
        currentSolver,
        currentExecutor,
        currentOptions,
        IDTabsToExecute,
        tabs,
        runAuto,
        outputModel,
        outputError,
    ]);

    return loideData;
};
