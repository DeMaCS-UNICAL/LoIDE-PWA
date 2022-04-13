import React, { useEffect, useState } from "react";
import Option from "./Option";
import {
  IExecutorData,
  ILanguageData,
  IOptionsData,
  ISolverData,
} from "../lib/LoideAPIInterfaces";
import { ISolverOption } from "../lib/LoideInterfaces";
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
  IonToggle,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import TabToExecute from "./TabToExecute";
import { useLanguageAvailable } from "../hooks/useLanguageAvailable";
import NoLanguageAvailable from "./NoLangualeAvailable";
import { useSetRunSettings } from "../hooks/useSetRunSettings";
import { useDispatch, useSelector } from "react-redux";
import { languagesDataSelector } from "../redux/slices/LanguagesData";
import {
  initialRunSettingsState,
  runSettingsSelector,
  setCurrentExecutor,
  setCurrentLanguage,
  setCurrentOptions,
  setCurrentSolver,
  setRunAuto,
  setTabsIDToExecute,
} from "../redux/slices/RunSettings";
import { editorSelector } from "../redux/slices/Editor";
import { LocalStorageItems, LoideLanguages } from "../lib/constants";
import Utils from "../lib/utils";

const RunSettings: React.FC = () => {
  const dispatch = useDispatch();

  const { languages } = useSelector(languagesDataSelector);

  const {
    currentLanguage,
    currentSolver,
    currentExecutor,
    currentOptions,
    tabsIDToExecute,
    runAuto,
  } = useSelector(runSettingsSelector);

  const { tabs } = useSelector(editorSelector);

  const languageAvailable = useLanguageAvailable();

  const [showRunAutoToggle, setShowRunAutoToggle] = useState<boolean>(false);

  // check if the current language supports the auto run
  useEffect(() => {
    let runAutoSupported = Object.values(LoideLanguages).some((lang) => {
      return lang.name === currentLanguage && lang.runAutoSupported;
    });
    if (!runAutoSupported) {
      dispatch(setRunAuto(false));
    } else if (runAutoSupported) {
      dispatch(setRunAuto(initialRunSettingsState.runAuto));
      Utils.restoreRunAutoFromLocalStorage();
    }
    setShowRunAutoToggle(runAutoSupported);
  }, [currentLanguage, dispatch]);

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
          return solver.options ? solver.options : new Array<IOptionsData>();
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
      dispatch(setCurrentLanguage(languageSelected!.value));

      dispatch(setCurrentSolver(languageSelected!.solvers[0].value));

      dispatch(
        setCurrentExecutor(languageSelected!.solvers[0].executors[0].value)
      );

      // reset all the options
      dispatch(setCurrentOptions([]));
    }
  };

  const selectSolver = (e: any) => {
    let value = e.target.value;
    dispatch(setCurrentSolver(value));
  };

  const selectExecutor = (e: any) => {
    let value = e.target.value;
    setCurrentExecutor(value);
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
      dispatch(setCurrentOptions(nextOptions));
    }
  };

  const onDeleteOption = (id: number) => {
    let nextOptions: ISolverOption[] = JSON.parse(
      JSON.stringify(currentOptions)
    ); // clone current options

    nextOptions.splice(id, 1);
    nextOptions.map((opt, index) => (opt.id = index));
    dispatch(setCurrentOptions(nextOptions));
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
    dispatch(setCurrentOptions(nextOptions));
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
    dispatch(setCurrentOptions(nextOptions));
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
    dispatch(setCurrentOptions(nextOptions));
  };

  const onRunAutoChange = () => {
    dispatch(setRunAuto(!runAuto));
    localStorage.setItem(LocalStorageItems.runAuto, (!runAuto).toString());
  };

  const onCheckTab = (idTab: number, value: boolean) => {
    let index = tabsIDToExecute.indexOf(idTab);
    let nextTabIDs = [...tabsIDToExecute];
    if (index === -1) {
      if (value) nextTabIDs.push(idTab);
    } else {
      if (!value) nextTabIDs.splice(index, 1);
    }
    dispatch(setTabsIDToExecute(nextTabIDs));
  };
  const onCheckCurrentTab = (value: boolean) => {
    if (value) {
      dispatch(setTabsIDToExecute([]));
    }
  };

  const onCheckAllTabs = (value: boolean) => {
    if (value) {
      let nextTabIDs: number[] = Object.keys(tabs).map((item) => Number(item));
      dispatch(setTabsIDToExecute(nextTabIDs));
    }
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

  if (!languageAvailable) return <NoLanguageAvailable />;

  return (
    <>
      <IonRow className="ion-no-padding">
        <IonCol size="12" className="ion-no-padding ion-margin-bottom">
          <IonList className="ion-no-padding">
            <IonListHeader>
              <IonLabel>Language, Solver and Executor</IonLabel>
            </IonListHeader>
            <IonItem>
              <IonLabel> Language </IonLabel>
              <IonSelect value={currentLanguage} onIonChange={selectLanguage}>
                {languagesOptions}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel> Solver </IonLabel>
              <IonSelect value={currentSolver} onIonChange={selectSolver}>
                {solversOptions}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel> Executor </IonLabel>
              <IonSelect value={currentExecutor} onIonChange={selectExecutor}>
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
                  onChangeOptionValues={onChangeOptionValues}
                  onDeleteOption={onDeleteOption}
                  onChangeDisableOption={onChangeDisableOption}
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

          {showRunAutoToggle && (
            <IonList className="ion-no-padding">
              <IonListHeader>
                <IonLabel>Execution options</IonLabel>
              </IonListHeader>
              <IonItem>
                <IonLabel>Run automatically </IonLabel>
                <IonToggle
                  title="Run automatically"
                  checked={runAuto}
                  slot="end"
                  onIonChange={onRunAutoChange}
                />
              </IonItem>
            </IonList>
          )}

          <TabToExecute
            tabs={tabs}
            tabsIDToExecute={tabsIDToExecute}
            onCheckCurrentTab={onCheckCurrentTab}
            onCheckAllTabs={onCheckAllTabs}
            onCheckTab={onCheckTab}
          />
        </IonCol>
      </IonRow>
    </>
  );
};

export default RunSettings;
