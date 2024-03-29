import { IonButton, IonButtons } from "@ionic/react";
import { alertController } from "@ionic/core";
import React, { useEffect, useState } from "react";
import Utils from "../lib/utils";
import { store } from "../redux";
import { ButtonText, WindowConfirmMessages } from "../lib/constants";

const RestoreButton: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    const project = Utils.getProjectFromLocalStorage();
    if (project && Utils.isValidProjectToLoad(project)) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, []);

  const restoreProject = () => {
    const project = Utils.getProjectFromLocalStorage();
    const languagesData = store.getState().languagesData.languages;

    Utils.setProjectFromConfig(project, languagesData, () => {
      setShow(false);
    });
  };

  const showRestoreProjectAlert = () => {
    alertController
      .create({
        message: WindowConfirmMessages.RestoreProject.message,
        header: WindowConfirmMessages.RestoreProject.header,
        buttons: [
          { text: ButtonText.Cancel },
          {
            text: ButtonText.Restore,
            handler: () => restoreProject(),
          },
        ],
      })
      .then((alert) => alert.present());
  };

  if (!show) return null;
  return (
    <>
      <IonButtons slot="end">
        <IonButton
          title="Restore project"
          fill="outline"
          color="secondary"
          onClick={showRestoreProjectAlert}
        >
          Restore Project
        </IonButton>
      </IonButtons>
    </>
  );
};

export default RestoreButton;
