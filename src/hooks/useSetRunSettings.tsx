import { useEffect } from "react";
import { LanguagesDataStore, RunSettingsStore } from "../lib/store";

export const useSetRunSettings = () => {
    const languages = LanguagesDataStore.useState((l) => l.languages);
    const currentLanguage = RunSettingsStore.useState((l) => l.currentLanguage);
    const currentSolver = RunSettingsStore.useState((l) => l.currentSolver);
    const currentExecutor = RunSettingsStore.useState((l) => l.currentExecutor);

    useEffect(() => {
        if (languages.length > 0) {
            let firstLanguage = languages[0];

            if (currentLanguage.length === 0)
                RunSettingsStore.update((settings) => {
                    settings.currentLanguage = firstLanguage.value;
                });
            if (currentSolver.length === 0)
                RunSettingsStore.update((settings) => {
                    settings.currentSolver = firstLanguage.solvers[0].value;
                });
            if (currentExecutor.length === 0)
                RunSettingsStore.update((settings) => {
                    settings.currentExecutor =
                        firstLanguage.solvers[0].executors[0].value;
                });
        }
    }, [languages, currentLanguage, currentSolver, currentExecutor]);
};
