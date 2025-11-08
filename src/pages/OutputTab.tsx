import React from "react";
import {
  IonButton,
  IonButtons,
  // IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  // IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Output from "../components/Output";
import { backspaceOutline, downloadOutline } from "ionicons/icons";
import Utils from "../lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { UIStatusSelector } from "../redux/slices/UIStatus";
import { outputSelector, setEmpty } from "../redux/slices/Output";

const OutputTab: React.FC = () => {
  const dispatch = useDispatch();

  const { model, error } = useSelector(outputSelector);

  const { fontSizeOutput } = useSelector(UIStatusSelector);

  const clearOutput = () => {
    dispatch(setEmpty());
  };

  const downloadOutput = () => {
    const fileContent = `${model} ${model.length > 0 ? "\n\n" : ""} ${error}`;

    const fileTitle = "LoIDE_Output";

    Utils.downloadTextFile(fileTitle, fileContent);
  };
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
              <span className="margin-button-left">Clear</span>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false} className="tab-content-of-hidden">
        {/* <IonRow style={{ height: "100%" }}>
          <IonCol
            size-md="8"
            offset-md="2"
            size-xl="6"
            offset-xl="3"
            className="ion-no-padding"
            style={{ height: "100%" }}
          > */}
        <Output model={model} error={error} fontSize={fontSizeOutput} />
        {/* </IonCol>
        </IonRow> */}
      </IonContent>
    </IonPage>
  );
};

export default OutputTab;
