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
import { EXAMPLE_PROGRAMS, ExampleProgram } from "../../lib/examples";
import ExampleDetailPage from "./ExampleDetailPage";

interface ExampleListPageProps {
  navRef: React.RefObject<HTMLIonNavElement>;
  onDismiss: () => void;
  onSelectExample: (example: ExampleProgram) => void;
}

const ExampleListPage: React.FC<ExampleListPageProps> = ({
  navRef,
  onDismiss,
  onSelectExample,
}) => {
  const pushDetail = async (example: ExampleProgram) => {
    if (!navRef.current) return;

    await navRef.current.push(() => (
      <ExampleDetailPage example={example} onSelectExample={onSelectExample} />
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
            <IonItem key={example.id} button detail onClick={() => pushDetail(example)}>
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
