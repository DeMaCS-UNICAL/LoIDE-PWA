import React from "react";
import Option from "./Option";
import {
    IExecutorData,
    ILanguageData,
    IOptionsData,
    ISolverData,
} from "../lib/LoideAPIInterfaces";
import { ISolverOption } from "../lib/LoideInterfaces";
import {
    EditorStore,
    LanguagesDataStore,
    RunSettingsStore,
} from "../lib/store";
import {
    IonButton,
    IonCol,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonRow,
    IonSelect,
    IonSelectOption,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import TabToExecute from "./TabToExecute";
import { useLanguageAvailable } from "../hooks/useLanguageAvailable";
import NoLanguageAvailable from "./NoLangualeAvailable";
import { useSetRunSettings } from "../hooks/useSetRunSettings";

const RunSettings: React.FC = () => {
    const languages = LanguagesDataStore.useState((l) => l.languages);

    const currentLanguage = RunSettingsStore.useState((l) => l.currentLanguage);
    const currentSolver = RunSettingsStore.useState((l) => l.currentSolver);
    const currentExecutor = RunSettingsStore.useState((l) => l.currentExecutor);
    const currentOptions = RunSettingsStore.useState((l) => l.currentOptions);
    const tabsIDToExecute = RunSettingsStore.useState((l) => l.IDTabsToExecute);

    const editorTabs = EditorStore.useState((e) => e.tabs);

    const languageAvailable = useLanguageAvailable();

    const getSolvers = (): ISolverData[] => {
        for (let lang of languages) {
            if (lang.value === currentLanguage) {
                return lang.solvers;
            }
        }
        return new Array<ISolverData>();
    };

    const getExecutors = (): IExecutorData[] => {
        let solvers = getSolvers();
        if (solvers) {
            for (let solver of solvers) {
                if (solver.value === currentSolver) {
                    return solver.executors;
                }
            }
        }
        return new Array<IExecutorData>();
    };

    const getOptions = (): IOptionsData[] => {
        let solvers = getSolvers();
        if (solvers) {
            for (let solver of solvers) {
                if (solver.value === currentSolver) {
                    return solver.options
                        ? solver.options
                        : new Array<IOptionsData>();
                }
            }
        }
        return new Array<IOptionsData>();
    };

    const selectLanguage = (e: any) => {
        let value = e.target.value;
        let languageSelected: ILanguageData | undefined = undefined;
        for (let lang of languages) {
            if (lang.value === value) {
                languageSelected = lang;
                break;
            }
        }
        if (languageSelected) {
            RunSettingsStore.update((settings) => {
                settings.currentLanguage = languageSelected!.value;
            });
            RunSettingsStore.update((settings) => {
                settings.currentSolver = languageSelected!.solvers[0].value;
            });
            RunSettingsStore.update((settings) => {
                settings.currentExecutor = languageSelected!.solvers[0].executors[0].value;
            });
            // reset all the options
            RunSettingsStore.update((settings) => {
                settings.currentOptions = [];
            });
        }
    };

    const selectSolver = (e: any) => {
        let value = e.target.value;
        RunSettingsStore.update((settings) => {
            settings.currentSolver = value;
        });
    };

    const selectExecutor = (e: any) => {
        let value = e.target.value;
        RunSettingsStore.update((settings) => {
            settings.currentExecutor = value;
        });
    };

    const addOption = () => {
        let optionsAvailable = getOptions();
        if (optionsAvailable.length > 0) {
            let nextOptions: ISolverOption[] = [
                ...currentOptions,
                {
                    id: currentOptions.length,
                    name: optionsAvailable[0].value,
                    values: [""],
                    disabled: false,
                },
            ];
            RunSettingsStore.update((settings) => {
                settings.currentOptions = nextOptions;
            });
        }
    };

    const onDeleteOption = (id: number) => {
        let nextOptions: ISolverOption[] = JSON.parse(
            JSON.stringify(currentOptions)
        ); // clone current options

        nextOptions.splice(id, 1);
        nextOptions.map((opt, index) => (opt.id = index));
        RunSettingsStore.update((settings) => {
            settings.currentOptions = nextOptions;
        });
    };

    const onChangeDisableOption = (id: number, value: boolean) => {
        let nextOptions: ISolverOption[] = JSON.parse(
            JSON.stringify(currentOptions)
        ); // clone current options
        for (let i = 0; i < nextOptions.length; i++) {
            if (nextOptions[i].id === id) {
                nextOptions[i].disabled = value;
                break;
            }
        }
        RunSettingsStore.update((settings) => {
            settings.currentOptions = nextOptions;
        });
    };

    const onChangeOptionType = (newValue: any, id: number) => {
        let nextOptions: ISolverOption[] = JSON.parse(
            JSON.stringify(currentOptions)
        ); // clone current options
        for (let option of nextOptions) {
            if (option.id === id) {
                option.name = newValue;
                break;
            }
        }
        RunSettingsStore.update((settings) => {
            settings.currentOptions = nextOptions;
        });
    };

    const onChangeOptionValues = (newValues: string[], id: number) => {
        let nextOptions: ISolverOption[] = JSON.parse(
            JSON.stringify(currentOptions)
        ); // clone current options
        for (let option of nextOptions) {
            if (option.id === id) {
                option.values = newValues;
                break;
            }
        }
        RunSettingsStore.update((settings) => {
            settings.currentOptions = nextOptions;
        });
    };

    const onCheckTab = (idTab: number, value: boolean) => {
        RunSettingsStore.update((settings) => {
            let index = settings.IDTabsToExecute.indexOf(idTab);
            let nextTabIDs = [...settings.IDTabsToExecute];
            if (index === -1) {
                if (value) nextTabIDs.push(idTab);
            } else {
                if (!value) nextTabIDs.splice(index, 1);
            }
            settings.IDTabsToExecute = nextTabIDs;
        });
    };
    const onCheckCurrentTab = (value: boolean) => {
        if (value)
            RunSettingsStore.update((settings) => {
                settings.IDTabsToExecute = [];
            });
    };

    const onCheckAllTabs = (value: boolean) => {
        if (value)
            RunSettingsStore.update((settings) => {
                let nextTabIDs = [...editorTabs.keys()];
                settings.IDTabsToExecute = nextTabIDs;
            });
    };

    const languagesOptions = languages.map((lang, index) => (
        <IonSelectOption key={`language-${index}`} value={lang.value}>
            {lang.name}
        </IonSelectOption>
    ));

    const solversOptions = getSolvers().map((solver, index) => (
        <IonSelectOption key={`solver-${index}`} value={solver.value}>
            {solver.name}
        </IonSelectOption>
    ));

    const executorsOptions = getExecutors().map((executor, index) => (
        <IonSelectOption key={`executor-${index}`} value={executor.value}>
            {executor.name}
        </IonSelectOption>
    ));

    // set language, solver and executor if they are empty or resetted
    useSetRunSettings();

    return (
        <>
            {!languageAvailable && <NoLanguageAvailable />}
            {languageAvailable && (
                <IonRow className="ion-no-padding">
                    <IonCol
                        size="12"
                        className="ion-no-padding ion-margin-bottom"
                    >
                        <IonList className="ion-no-padding">
                            <IonListHeader>
                                <IonLabel>
                                    Language, Solver and Executor
                                </IonLabel>
                            </IonListHeader>
                            <IonItem>
                                <IonLabel> Language </IonLabel>
                                <IonSelect
                                    value={currentLanguage}
                                    onIonChange={selectLanguage}
                                >
                                    {languagesOptions}
                                </IonSelect>
                            </IonItem>

                            <IonItem>
                                <IonLabel> Solver </IonLabel>
                                <IonSelect
                                    value={currentSolver}
                                    onIonChange={selectSolver}
                                >
                                    {solversOptions}
                                </IonSelect>
                            </IonItem>

                            <IonItem>
                                <IonLabel> Executor </IonLabel>
                                <IonSelect
                                    value={currentExecutor}
                                    onIonChange={selectExecutor}
                                >
                                    {executorsOptions}
                                </IonSelect>
                            </IonItem>
                        </IonList>

                        {getOptions().length > 0 && (
                            <>
                                <IonListHeader>
                                    <IonLabel>Solver options</IonLabel>
                                </IonListHeader>
                                {currentOptions.map((option) => (
                                    <Option
                                        key={`solver-option-${option.id}`}
                                        optionsAvailable={getOptions()}
                                        optionData={option}
                                        disabled={option.disabled}
                                        onChangeOptionType={onChangeOptionType}
                                        onChangeOptionValues={
                                            onChangeOptionValues
                                        }
                                        onDeleteOption={onDeleteOption}
                                        onChangeDisableOption={
                                            onChangeDisableOption
                                        }
                                    />
                                ))}
                                <IonButton
                                    className="ion-padding-start ion-padding-end"
                                    title="Add option"
                                    expand="block"
                                    onClick={addOption}
                                    style={{
                                        marginTop: "10px",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <IonIcon icon={addOutline} />
                                    Add Option
                                </IonButton>
                            </>
                        )}

                        <TabToExecute
                            tabs={editorTabs}
                            tabsIDToExecute={tabsIDToExecute}
                            onCheckCurrentTab={onCheckCurrentTab}
                            onCheckAllTabs={onCheckAllTabs}
                            onCheckTab={onCheckTab}
                        />
                    </IonCol>
                </IonRow>
            )}
        </>
    );
};

export default RunSettings;
