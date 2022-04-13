import {
  IonBadge,
  IonCol,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
} from "@ionic/react";
import React from "react";

const KeyboardShortcutsList: React.FC = () => {
  return (
    <>
      <IonRow>
        <IonCol>
          <IonList lines="full">
            <IonItem>
              <IonLabel slot="start">Open Project/Files</IonLabel>
              <IonBadge
                color="medium"
                style={{ marginRight: "5px" }}
                slot="end"
              >
                Ctrl/⌘
              </IonBadge>
              <IonBadge color="medium" className="ion-no-margin" slot="end">
                O
              </IonBadge>
            </IonItem>
            <IonItem>
              <IonLabel slot="start">Save Project</IonLabel>
              <IonBadge
                color="medium"
                style={{ marginRight: "5px" }}
                slot="end"
              >
                Ctrl/⌘
              </IonBadge>
              <IonBadge color="medium" className="ion-no-margin" slot="end">
                S
              </IonBadge>
            </IonItem>
            <IonItem>
              <IonLabel slot="start">Share</IonLabel>
              <IonBadge
                color="medium"
                style={{ marginRight: "5px" }}
                slot="end"
              >
                Ctrl/⌘
              </IonBadge>
              <IonBadge
                color="medium"
                style={{ marginRight: "5px" }}
                className="ion-no-margin"
                slot="end"
              >
                Shift
              </IonBadge>
              <IonBadge color="medium" className="ion-no-margin" slot="end">
                S
              </IonBadge>
            </IonItem>
            <IonItem>
              <IonLabel slot="start">Run Project</IonLabel>
              <IonBadge
                color="medium"
                style={{ marginRight: "5px" }}
                slot="end"
              >
                Ctrl/⌘
              </IonBadge>
              <IonBadge color="medium" className="ion-no-margin" slot="end">
                Enter
              </IonBadge>
            </IonItem>

            <IonItem>
              <IonLabel>
                For editor shortcuts see the{" "}
                <a
                  href="https://github.com/ajaxorg/ace/wiki/Default-Keyboard-Shortcuts"
                  rel="noreferrer"
                  target="_blank"
                >
                  official page
                </a>
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCol>
      </IonRow>
    </>
  );
};

export default KeyboardShortcutsList;
