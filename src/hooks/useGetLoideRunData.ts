import { useEffect, useState } from "react";

import { RunSettingsStore, EditorStore } from "../lib/store";
import { ILoideRunData } from "../lib/LoideAPIInterfaces";

export const useGetLoideRunData = (): ILoideRunData => {
    const currentLanguage = RunSettingsStore.useState((s) => s.currentLanguage);
    const currentSolver = RunSettingsStore.useState((s) => s.currentSolver);
    const currentExecutor = RunSettingsStore.useState((s) => s.currentExecutor);
    const currentOptions = RunSettingsStore.useState((s) => s.currentOptions);
    const IDTabsToExecute = RunSettingsStore.useState((s) => s.IDTabsToExecute);
    const tabs = EditorStore.useState((e) => e.tabs);
    const currentTabID = EditorStore.useState((e) => e.currentTab);

    const [loideData, setLoideData] = useState<ILoideRunData>(
        {} as ILoideRunData
    );

    useEffect(() => {
        let data: ILoideRunData = {} as ILoideRunData;
        data.language = currentLanguage;
        data.engine = currentSolver;
        data.executor = currentExecutor;

        if (currentOptions.length === 0) {
            data.option = [{ name: "", value: [""] }];
        } else {
            for (let option of currentOptions) {
                data.option = [];
                if (!option.disabled)
                    data.option.push({
                        name: option.name,
                        value: option.values,
                    });
            }
        }

        data.program = [];

        if (IDTabsToExecute.length === 0) {
            let program = tabs.get(currentTabID + 1)?.value;
            if (program !== undefined) {
                data.program.push(program);
            }
        } else {
            for (let tabID of IDTabsToExecute) {
                let program = tabs.get(tabID)?.value;
                if (program !== undefined) {
                    data.program.push(program);
                }
            }
        }

        setLoideData(data);
    }, [
        currentLanguage,
        currentSolver,
        currentExecutor,
        currentOptions,
        IDTabsToExecute,
        tabs,
        currentTabID,
    ]);

    return loideData;
};
