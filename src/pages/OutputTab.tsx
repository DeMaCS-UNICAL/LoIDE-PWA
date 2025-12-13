import React, { useCallback } from "react";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Output from "../components/Output";
import { backspaceOutline, downloadOutline } from "ionicons/icons";
import Utils from "../lib/utils";
import useOutput from "../hooks/useOutput";
import useAppearance from "../hooks/useAppearance";

const OutputTab: React.FC = () => {
  const { clearOutput, model, error } = useOutput();
  const { fontSizeOutput } = useAppearance();
  const downloadOutput = useCallback(() => Utils.downloadOutput(model, error), [model, error]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Output</IonTitle>
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
              size="small"
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
      <IonContent scrollY={false} className="tab-content-of-hidden">
        <IonRow style={{ height: "100%" }}>
          <IonCol
            size-md="8"
            offset-md="2"
            size-xl="6"
            offset-xl="3"
            className="ion-no-padding"
            style={{ height: "100%" }}
          >
            <Output model={model} error={error} fontSize={fontSizeOutput} />
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default OutputTab;
