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
import KeyboardShortcutsList from "../components/KeyboardShortcutsList";

interface ShortcutsModalProps {
  isOpen: boolean;
  onDismiss: (value: boolean) => void;
}

const ShortcutsModal: React.FC<ShortcutsModalProps> = (props) => {
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
          <IonTitle>Keyboard Shortcuts</IonTitle>
          <IonButtons slot="end">
            <IonButton color="primary" onClick={() => props.onDismiss(false)}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <KeyboardShortcutsList />
      </IonContent>
    </IonModal>
  );
};

export default ShortcutsModal;
