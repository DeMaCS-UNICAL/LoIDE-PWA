import { IonButton, IonButtons, IonHeader, IonIcon, IonToolbar } from "@ionic/react";
import Output from "./Output";
import useOutput from "../hooks/useOutput";
import useAppearance from "../hooks/useAppearance";
import { useCallback } from "react";
import Utils from "../lib/utils";
import { backspaceOutline, downloadOutline } from "ionicons/icons";

const OutputPane = () => {
  const { clearOutput, model, error } = useOutput();
  const { fontSizeOutput } = useAppearance();
  const downloadOutput = useCallback(() => Utils.downloadOutput(model, error), [model, error]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              color="primary"
              className="ion-hide-sm-up"
              title="Download"
              disabled={model.length === 0 && error.length === 0}
              onClick={downloadOutput}
            >
              <IonIcon icon={downloadOutline} />
              <span className="margin-button-left">Download</span>
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton
              color="primary"
              className="ion-hide-sm-down"
              title="Download"
              disabled={model.length === 0 && error.length === 0}
              onClick={downloadOutput}
            >
              <IonIcon icon={downloadOutline} />
              <span className="margin-button-left">Download</span>
            </IonButton>
            <IonButton
              color="medium"
              title="Clear"
              disabled={model.length === 0 && error.length === 0}
              onClick={clearOutput}
            >
              <IonIcon icon={backspaceOutline} />
              <span className="margin-button-left"> Clear </span>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <div style={{ flex: 1, overflow: "auto" }}>
        <Output model={model} error={error} fontSize={fontSizeOutput} />
      </div>
    </div>
  );
};

export default OutputPane;
