import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import SaveProject from "../components/SaveProject";

interface SaveProjectModalProps {
  isOpen: boolean;
  onDismiss: (value: boolean) => void;
}

const SaveProjectModal: React.FC<SaveProjectModalProps> = (props) => {
  const [showModal, setShowModal] = useState<boolean>(props.isOpen);

  useEffect(() => {
    setShowModal(props.isOpen);
  }, [props.isOpen]);

  return (
    <IonModal
      isOpen={showModal}
      canDismiss={true}
      onDidDismiss={() => props.onDismiss(false)}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Save project</IonTitle>
          <IonButtons slot="end">
            <IonButton color="primary" onClick={() => props.onDismiss(false)}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <SaveProject />
      </IonContent>
    </IonModal>
  );
};

export default SaveProjectModal;
