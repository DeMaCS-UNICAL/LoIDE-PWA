import React from "react";
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
import { OutputStore, UIStatusStore } from "../lib/store";
import { backspaceOutline, downloadOutline } from "ionicons/icons";
import Utils from "../lib/utils";

const OutputTab: React.FC = () => {
    const outputModel = OutputStore.useState((o) => o.model);
    const outputError = OutputStore.useState((o) => o.error);

    const outputFontSize = UIStatusStore.useState((u) => u.fontSizeOutput);

    const clearOutput = () => {
        OutputStore.update((o) => {
            o.model = "";
            o.error = "";
        });
    };

    const downloadOutput = () => {
        let fileContent = `${outputModel} ${
            outputModel.length > 0 ? "\n\n" : ""
        } ${outputError}`;

        let fileTitle = "LoIDE_Output";

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
                            disabled={
                                outputModel.length === 0 &&
                                outputError.length === 0
                            }
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
                            disabled={
                                outputModel.length === 0 &&
                                outputError.length === 0
                            }
                            onClick={downloadOutput}
                        >
                            <IonIcon icon={downloadOutline} />
                            <span className="margin-button-left">Download</span>
                        </IonButton>
                        <IonButton
                            size="small"
                            color="medium"
                            title="Clear"
                            disabled={
                                outputModel.length === 0 &&
                                outputError.length === 0
                            }
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
                        <Output
                            model={outputModel}
                            error={outputError}
                            fontSize={outputFontSize}
                        />
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    );
};

export default OutputTab;
