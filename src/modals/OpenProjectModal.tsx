import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonModal,
    IonSpinner,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useIsDarkMode } from "../hooks/useIsDarkMode";
import LoideFileDropzone from "../components/LoideFileDropzone";
import { useSelector } from "react-redux";
import { UIStatusSelector } from "../redux/slices/UIStatus";

interface OpenFileModalModalProps {
    isOpen: boolean;
    onDismiss: (value: boolean) => void;
}

const OpenProjectModal: React.FC<OpenFileModalModalProps> = (props) => {
    const [showModal, setShowModal] = useState(false);

    const darkMode = useIsDarkMode();

    const { loadingFiles } = useSelector(UIStatusSelector);

    useEffect(() => {
        setShowModal(props.isOpen);
    }, [props.isOpen]);

    const onFinishLoad = (ok: boolean) => {
        if (ok) setShowModal(false);
    };

    return (
        <IonModal
            isOpen={showModal}
            swipeToClose={true}
            onDidDismiss={() => props.onDismiss(false)}
        >
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Open project or text files</IonTitle>
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
                {loadingFiles && (
                    <div className="loading-files">
                        <IonSpinner style={{ width: "50px", height: "50px" }} />
                    </div>
                )}
                {!loadingFiles && (
                    <LoideFileDropzone
                        onFinishLoad={onFinishLoad}
                        darkMode={darkMode}
                    />
                )}
            </IonContent>
        </IonModal>
    );
};

export default OpenProjectModal;
