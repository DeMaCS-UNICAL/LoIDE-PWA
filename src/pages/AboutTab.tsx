import React from "react";
import {
  IonCol,
  IonContent,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import About from "../components/About";

const AboutTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>About LoIDE</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonRow>
          <IonCol
            size-md="8"
            offset-md="2"
            size-xl="6"
            offset-xl="3"
            className="ion-no-padding"
          >
            <About />
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default AboutTab;
