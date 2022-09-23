import React from "react";
import { IonCol, IonContent, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import RunSettings from "../components/RunSettings";

const RunSettingsTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Run settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent forceOverscroll={true}>
        <IonRow>
          <IonCol size-md="8" offset-md="2" size-xl="6" offset-xl="3" className="ion-no-padding">
            <RunSettings />
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default RunSettingsTab;
