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
import Appearance from "../components/Appearance";

const AppearanceTab: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Appearance</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <IonRow>
                    <IonCol
                        size-md="8"
                        offset-md="2"
                        size-xl="6"
                        offset-xl="3"
                        className="ion-no-padding"
                    >
                        <Appearance />
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    );
};

export default AppearanceTab;
