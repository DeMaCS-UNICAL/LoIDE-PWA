import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { EXAMPLE_PROGRAMS, IExampleProgram } from "../../lib/examples";
import ExampleDetailPage from "./ExampleDetailPage";

interface ExampleListPageProps {
  onDismiss: () => void;
  onSelectExample: (example: IExampleProgram) => void;
}

const ExampleListPage: React.FC<ExampleListPageProps> = ({
  onDismiss,
  onSelectExample,
}) => {
  const pushDetail = async (
    nav: HTMLIonNavElement,
    example: IExampleProgram
  ) => {
    await nav.push(() => (
      <ExampleDetailPage
        example={example}
        onSelectExample={onSelectExample}
      />
    ));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Examples</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismiss}>
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          {EXAMPLE_PROGRAMS.map((example) => (
            <IonItem
              key={example.id}
              button
              detail
              onClick={(e) => {
                const nav =
                  (e.currentTarget.closest("ion-nav") as any) ||
                  (document.querySelector("ion-nav") as any);
                if (nav) {
                  pushDetail(nav, example);
                }
              }}
            >
              <IonLabel>
                <h2>{example.title}</h2>
                <p>{example.description}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ExampleListPage;