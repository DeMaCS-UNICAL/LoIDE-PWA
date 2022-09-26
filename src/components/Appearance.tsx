import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRange,
  IonToggle,
} from "@ionic/react";
import { moonOutline } from "ionicons/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LocalStorageItems } from "../lib/constants";
import Utils from "../lib/utils";
import {
  setDarkMode,
  setFontSizeEditor,
  setFontSizeOutput,
  UIStatusSelector,
} from "../redux/slices/UIStatus";

const Appearance: React.FC = () => {
  const dispatch = useDispatch();

  const { darkMode, fontSizeEditor, fontSizeOutput } = useSelector(UIStatusSelector);

  const onDarkModeChange = () => {
    dispatch(setDarkMode(!darkMode));
    localStorage.setItem(LocalStorageItems.darkMode, (!darkMode).toString());
  };

  const onFontEditorChange = (e: any) => {
    const value = e?.detail?.value;
    if (value) {
      dispatch(setFontSizeEditor(value));
      localStorage.setItem(LocalStorageItems.fontSizeEditor, value.toString());
    }
  };

  const onFontOutputChange = (e: any) => {
    const value = e?.detail?.value;

    if (value) {
      dispatch(setFontSizeOutput(value.toString()));
      localStorage.setItem(LocalStorageItems.fontSizeOutput, value.toString());
    }
  };

  return (
    <>
      <IonList>
        <IonListHeader>General</IonListHeader>
        <IonItem>
          <IonIcon slot="start" color="dark" icon={moonOutline} />
          <IonLabel>Dark mode </IonLabel>
          <IonToggle
            title="Toogle dark mode"
            checked={darkMode}
            slot="end"
            onIonChange={onDarkModeChange}
          />
        </IonItem>
        <IonListHeader>Editor</IonListHeader>
        <IonItem>
          <IonRange
            value={fontSizeEditor}
            onIonChange={onFontEditorChange}
            min={15}
            max={30}
            pin={true}
            snaps={true}
            title="Font size editor range"
          >
            <IonLabel slot="start">Font size</IonLabel>
          </IonRange>
        </IonItem>
        <IonListHeader>Output</IonListHeader>
        <IonItem>
          <IonRange
            value={fontSizeOutput}
            onIonChange={onFontOutputChange}
            min={15}
            max={30}
            pin={true}
            snaps={true}
            title="Font size output range"
          >
            <IonLabel slot="start">Font size</IonLabel>
          </IonRange>
        </IonItem>
      </IonList>
      <IonButton
        className="ion-margin-top"
        color="danger"
        fill="outline"
        expand="block"
        title="Reset appearance options"
        onClick={Utils.resetAppearanceOptions}
      >
        Reset
      </IonButton>
    </>
  );
};

export default Appearance;
