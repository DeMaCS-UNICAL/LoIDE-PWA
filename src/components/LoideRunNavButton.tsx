import { IonButton, IonIcon } from "@ionic/react";
import { play } from "ionicons/icons";
import React from "react";
import { useLanguageAvailable } from "../hooks/useLanguageAvailable";
import API from "../lib/api";
import Utils from "../lib/utils";

const LoideRunNavButton: React.FC = () => {
    const languageAvailable = useLanguageAvailable();

    const onRun = () => {
        let dataToRun = Utils.getLoideRunData();
        API.emitRunProject(dataToRun);
    };

    return (
        <IonButton
            disabled={!languageAvailable}
            title="run"
            color="success"
            onClick={onRun}
        >
            <IonIcon icon={play} />
            <span className="margin-button-left">Run</span>
        </IonButton>
    );
};

export default LoideRunNavButton;
