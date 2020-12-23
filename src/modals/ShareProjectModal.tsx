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
import ShareProject from "../components/ShareProject";

interface ShareProjectModalProps {
    isOpen: boolean;
    onDismiss: (value: boolean) => void;
}

const ShareProjectModal: React.FC<ShareProjectModalProps> = (props) => {
    const [showModal, setShowModal] = useState(props.isOpen);

    useEffect(() => {
        setShowModal(props.isOpen);
    }, [props.isOpen]);

    return (
        <IonModal
            isOpen={showModal}
            swipeToClose={true}
            onDidDismiss={() => props.onDismiss(false)}
        >
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Share project</IonTitle>
                    <IonButtons slot="end">
                        <IonButton
                            color="primary"
                            onClick={() => props.onDismiss(false)}
                        >
                            Close
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <ShareProject
                    onCopyLink={(done) => {
                        if (done) props.onDismiss(!done);
                    }}
                />
            </IonContent>
        </IonModal>
    );
};

export default ShareProjectModal;
