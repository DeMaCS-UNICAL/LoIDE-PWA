import {
  IonCheckbox,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonListHeader,
  IonRadio,
  IonRadioGroup,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { AllTabs, CurrentTab } from "../lib/constants";
import { EditorTabMap } from "../lib/LoideInterfaces";

interface TabToExecuteProps {
  tabs: EditorTabMap;
  tabsIDToExecute: number[];
  onCheckCurrentTab: (value: boolean) => void;
  onCheckAllTabs: (value: boolean) => void;
  onCheckTab: (idTab: number, value: boolean) => void;
}

const TabToExecute: React.FC<TabToExecuteProps> = (props) => {
  const [tabRadioValue, setTabRadioValue] = useState<string>("");

  useEffect(() => {
    if (props.tabsIDToExecute.length === 0) {
      setTabRadioValue(CurrentTab);
    } else if (props.tabsIDToExecute.length === Object.keys(props.tabs).length) {
      setTabRadioValue(AllTabs);
    } else {
      setTabRadioValue("");
    }
  }, [props]);

  const onRadioTabChange = (e: any) => {
    const value = e.detail.value;
    setTabRadioValue(value);
    if (value === CurrentTab) {
      props.onCheckCurrentTab(true);
    } else if (value === AllTabs) {
      props.onCheckAllTabs(true);
    }
  };
  const onChange = (name: string, value: boolean) => {
    if (!name) return;
    const idTab = Number(name);
    if (isNaN(idTab)) throw new Error("Can't cast name into a number!");

    if (value) {
      const finded = props.tabsIDToExecute.find(function (id) {
        return id === idTab;
      });
      if (finded) {
        props.onCheckTab(idTab, value);
        return;
      }
    }

    props.onCheckTab(idTab, value);
  };

  const getIfChecked = (key: number): boolean => {
    const finded = props.tabsIDToExecute.find(function (id) {
      return id === key;
    });
    return finded ? true : false;
  };

  return (
    <>
      <IonList className="ion-no-padding">
        <IonRadioGroup
          value={tabRadioValue}
          onIonChange={onRadioTabChange}
          data-testid="group-radio-tab"
        >
          <IonListHeader>
            <IonLabel>Choose tab to execute</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonRadio title="Current tab" slot="start" value={`${CurrentTab}`} labelPlacement="end">Current tab</IonRadio>
          </IonItem>
          <IonItem lines="none">
            <IonRadio title="All tabs" slot="start" value={`${AllTabs}`} labelPlacement="end">All tabs</IonRadio>
          </IonItem>
        </IonRadioGroup>
      </IonList>
      <IonList className="ion-no-padding">
        <IonItemDivider mode="ios" className="tab-to-execute-divider" />

        {[...Object.keys(props.tabs).map((item) => Number(item))].map((key) => (
          <IonItem
            key={`item-tab-${key}`}
            onClick={() => onChange(`${key}`, !getIfChecked(key))}
            data-testid={`item-tab-${key}`}
          >
            <IonCheckbox
              slot="start"
              title={props.tabs[key].title}
              name={`${key}`}
              checked={getIfChecked(key)}
              labelPlacement="end"
            >
              {`${props.tabs[key].title}`}
            </IonCheckbox>
          </IonItem>
        ))}
      </IonList>
    </>
  );
};

export default TabToExecute;
