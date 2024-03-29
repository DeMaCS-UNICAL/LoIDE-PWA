import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonPage,
  IonPopover,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { alertController, actionSheetController } from "@ionic/core";
import logo from "../assets/img/logo_LoIDE.svg";
import RunSettings from "../components/RunSettings";
import LoideRunNavButton from "../components/LoideRunNavButton";
import Editor from "../components/Editor";
import OpenProjectModal from "../modals/OpenProjectModal";
import {
  closeCircleOutline,
  ellipsisVerticalOutline,
  folderOpenOutline,
  saveOutline,
  shareOutline,
} from "ionicons/icons";
import SaveProjectModal from "../modals/SaveProjectModal";
import { ActionSheet, ButtonText, WindowConfirmMessages } from "../lib/constants";
import Utils from "../lib/utils";
import ShareProjectModal from "../modals/ShareProjectModal";
import { RouteComponentProps } from "react-router";
import { useSelector } from "react-redux";
import { languagesDataSelector } from "../redux/slices/LanguagesData";
import RestoreButton from "../components/RestoreButton";
import Mousetrap from "mousetrap";

type MainTabPageProps = RouteComponentProps<{
  data: string;
}>;

const MainTab: React.FC<MainTabPageProps> = ({ match }) => {
  const [showOpenModal, setShowOpenModal] = useState<boolean>(false);
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [buttonsPopover, setButtonsPopover] = useState<{
    open: boolean;
    event: Event | undefined;
  }>({ open: false, event: undefined });

  const { languages } = useSelector(languagesDataSelector);

  useEffect(() => {
    if (languages.length > 0) {
      const dataToLoad = decodeURIComponent(match.params.data);
      if (Utils.isJSON(dataToLoad)) {
        const config = JSON.parse(dataToLoad);
        Utils.setProjectFromConfig(config, languages);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languages]);

  useEffect(() => {
    Mousetrap.bind(["ctrl+o", "command+o"], () => {
      setShowOpenModal(!showOpenModal);
      return false;
    });
    Mousetrap.bind(["ctrl+s", "command+s"], () => {
      setShowSaveModal(!showSaveModal);
      return false;
    });
    Mousetrap.bind(["ctrl+shift+s", "command+shift+s"], () => {
      setShowShareModal(!showShareModal);
      return false;
    });

    return () => {
      Mousetrap.unbind(["ctrl+o", "command+o"]);
      Mousetrap.unbind(["ctrl+s", "command+s"]);
      Mousetrap.unbind(["ctrl+shift+s", "command+shift+s"]);
    };
  }, [showOpenModal, showSaveModal, showShareModal]);

  const showResetInputAlert = () => {
    alertController
      .create({
        message: WindowConfirmMessages.ResetInput.message,
        header: WindowConfirmMessages.ResetInput.header,
        buttons: [
          { text: ButtonText.Cancel },
          {
            text: ButtonText.ResetInput,
            handler: () => Utils.Editor.resetInput(),
          },
        ],
      })
      .then((alert) => alert.present());
  };

  const showResetProjectAlert = () => {
    alertController
      .create({
        message: WindowConfirmMessages.ResetProject.message,
        header: WindowConfirmMessages.ResetProject.header,
        buttons: [
          { text: ButtonText.Cancel },
          {
            text: ButtonText.ResetProject,
            handler: () => Utils.resetProject(),
          },
        ],
      })
      .then((alert) => alert.present());
  };

  const showResetActionSheet = () => {
    actionSheetController
      .create({
        header: ActionSheet.Reset,
        buttons: [
          {
            text: ButtonText.ResetInput,
            role: "destructive",
            handler: () => showResetInputAlert(),
          },
          {
            text: ButtonText.ResetProject,
            role: "destructive",
            handler: () => showResetProjectAlert(),
          },
          {
            text: ButtonText.Cancel,
            role: "cancel",
          },
        ],
      })
      .then((alert) => alert.present());
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <LoideRunNavButton />
          </IonButtons>
          <img
            className="logo"
            style={{
              marginTop: "6px",
              marginLeft: "10px",
            }}
            height="30px"
            src={logo}
            alt="loide-logo"
          />
          <RestoreButton />
          <IonButtons slot="end">
            <IonButton
              title="Open"
              color="warning"
              className="ion-hide-sm-down"
              onClick={() => setShowOpenModal(true)}
            >
              <IonIcon icon={folderOpenOutline} />
              <span className="margin-button-left">Open</span>
            </IonButton>
            <IonButton
              title="Save"
              color="primary"
              className="ion-hide-sm-down"
              onClick={() => setShowSaveModal(true)}
            >
              <IonIcon icon={saveOutline} />
              <span className="margin-button-left">Save</span>
            </IonButton>
            <IonButton
              title="Share"
              color="success"
              className="ion-hide-sm-down"
              onClick={() => setShowShareModal(true)}
            >
              <IonIcon icon={shareOutline} />
              <span className="margin-button-left">Share</span>
            </IonButton>
            <IonButton
              title="Reset"
              color="danger"
              className="ion-hide-sm-down"
              onClick={() => showResetActionSheet()}
            >
              <IonIcon icon={closeCircleOutline} />
              <span className="margin-button-left">Reset</span>
            </IonButton>
            <IonButton
              color="primary"
              className="ion-hide-sm-up"
              title="Operations"
              onClick={(e) =>
                setButtonsPopover({
                  open: true,
                  event: e.nativeEvent,
                })
              }
            >
              <IonIcon icon={ellipsisVerticalOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false} className="tab-content-of-hidden">
        <IonSplitPane contentId="main" when="lg">
          {/*--  the side menu  --*/}
          <IonMenu contentId="main">
            <IonHeader>
              <IonToolbar className="side-toolbar">
                <IonTitle>Run settings</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent forceOverscroll={true}>
              <RunSettings />
            </IonContent>
          </IonMenu>

          {/*-- the main content --*/}
          <div id="main" className="main-side-editor">
            <Editor />
          </div>
        </IonSplitPane>
        <OpenProjectModal isOpen={showOpenModal} onDismiss={setShowOpenModal} />
        <SaveProjectModal isOpen={showSaveModal} onDismiss={setShowSaveModal} />
        <ShareProjectModal isOpen={showShareModal} onDismiss={setShowShareModal} />
        <IonPopover
          data-testid="operations-popover"
          isOpen={buttonsPopover.open}
          event={buttonsPopover.event}
          onDidDismiss={() => setButtonsPopover({ open: false, event: undefined })}
        >
          <IonList>
            <IonItem button={true} onClick={() => setShowOpenModal(true)} title="Open">
              <IonLabel>Open</IonLabel>
              <IonIcon color="warning" icon={folderOpenOutline} slot="end" />
            </IonItem>
            <IonItem button={true} onClick={() => setShowSaveModal(true)} title="Save">
              <IonLabel>Save</IonLabel>
              <IonIcon color="primary" icon={saveOutline} slot="end" />
            </IonItem>
            <IonItem button={true} title="Share" onClick={() => setShowShareModal(true)}>
              <IonLabel>Share</IonLabel>

              <IonIcon color="success" slot="end" icon={shareOutline} />
            </IonItem>
            <IonItem button={true} title="Reset" onClick={() => showResetActionSheet()}>
              <IonLabel>Reset</IonLabel>
              <IonIcon color="danger" icon={closeCircleOutline} slot="end" />
            </IonItem>
          </IonList>
        </IonPopover>
      </IonContent>
    </IonPage>
  );
};

export default MainTab;
