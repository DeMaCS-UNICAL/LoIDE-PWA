// src/components/OutputPane.tsx
import React from "react";
import { IonButtons, IonButton, IonIcon } from "@ionic/react";
import Output from "./Output";
import { useSelector, useDispatch } from "react-redux";
import { UIStatusSelector } from "../redux/slices/UIStatus";
import { outputSelector, setEmpty } from "../redux/slices/Output";
import {
  backspaceOutline,
  downloadOutline,
  restaurantOutline,
} from "ionicons/icons";
import Utils from "../lib/utils";
import { openAspChefFromLoide } from "../integrations/ASPChef";
import { editorSelector } from "../redux/slices/Editor";

const OutputPane: React.FC = () => {
  const dispatch = useDispatch();

  const { model, error } = useSelector(outputSelector);
  const { fontSizeOutput } = useSelector(UIStatusSelector);
  const editorState = useSelector(editorSelector);

  const hasContent = model.length > 0 || error.length > 0;

  const clearOutput = () => {
    if (!hasContent) return;
    dispatch(setEmpty());
  };

  const downloadOutput = () => {
    if (!hasContent) return;

    const fileContent = `${model} ${
      model.length > 0 ? "\n\n" : ""
    } ${error}`;
    const fileTitle = "LoIDE_Output";

    Utils.downloadTextFile(fileTitle, fileContent);
  };

  const openAspChef = () => {
    if (!hasContent) return;

    const { currentTabIndex, tabs } = editorState;

    const tabKeys = Object.keys(tabs || {});
    if (tabKeys.length === 0) {
      openAspChefFromLoide("");
      return;
    }

    const currentKey = tabKeys[currentTabIndex];
    const currentTab = (tabs as any)[currentKey];
    const currentLoideProgram = currentTab?.value?.toString() ?? "";

    openAspChefFromLoide(currentLoideProgram);
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Toolbar */}
      <div
        className="output-pane-toolbar"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "0.5rem 0.75rem",
        }}
      >
        <IonButtons>

          {/* 🔹 ASP Chef — ora disabilitato senza output */}
          <IonButton
            title="ASP Chef"
            disabled={!hasContent}
            onClick={openAspChef}
          >
            <IonIcon icon={restaurantOutline} />
            <span className="margin-button-left">ASP Chef</span>
          </IonButton>

          {/* 🔹 Download — ora disabilitato senza output */}
          <IonButton
            color="primary"
            title="Download"
            disabled={!hasContent}
            onClick={downloadOutput}
          >
            <IonIcon icon={downloadOutline} />
            <span className="margin-button-left">Download</span>
          </IonButton>

          {/* 🔹 Clear — ora disabilitato senza output */}
          <IonButton
            size="small"
            color="medium"
            title="Clear"
            disabled={!hasContent}
            onClick={clearOutput}
          >
            <IonIcon icon={backspaceOutline} />
            <span className="margin-button-left">Clear</span>
          </IonButton>
        </IonButtons>
      </div>

      {/* Area Output */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <Output model={model} error={error} fontSize={fontSizeOutput} />
      </div>
    </div>
  );
};

export default OutputPane;
