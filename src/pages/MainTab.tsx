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
  codeSlashOutline,
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

// Examples
import { EXAMPLE_PROGRAMS, IExampleProgram } from "../lib/examples";
import ExampleExplorerModal from "../modals/ExampleExplorerModal";
import { editorSelector } from "../redux/slices/Editor";

const VISIBLE_EXAMPLES_LIMIT = 4;

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

  // Examples: modal + popover
  const [showExamplesModal, setShowExamplesModal] = useState<boolean>(false);
  const [examplesPopover, setExamplesPopover] = useState<{
    open: boolean;
    event: Event | undefined;
  }>({ open: false, event: undefined });

  const { languages } = useSelector(languagesDataSelector);

  // editor state (per caricare esempi in tab corrente/nuova)
  const { tabCountID, currentTabIndex, tabs } = useSelector(editorSelector);

  const visibleExamples = EXAMPLE_PROGRAMS.slice(0, VISIBLE_EXAMPLES_LIMIT);

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

  // Keyboard shortcuts (robusto: bind una volta + setState funzionale)
  useEffect(() => {
    const open = () => {
      setShowOpenModal((v) => !v);
      return false;
    };
    const save = () => {
      setShowSaveModal((v) => !v);
      return false;
    };
    const share = () => {
      setShowShareModal((v) => !v);
      return false;
    };

    Mousetrap.bind(["ctrl+o", "command+o"], open);
    Mousetrap.bind(["ctrl+s", "command+s"], save);
    Mousetrap.bind(["ctrl+shift+s", "command+shift+s"], share);

    return () => {
      Mousetrap.unbind(["ctrl+o", "command+o"]);
      Mousetrap.unbind(["ctrl+s", "command+s"]);
      Mousetrap.unbind(["ctrl+shift+s", "command+shift+s"]);
    };
  }, []);

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

  // ==========================
  // Examples logic
  // ==========================
  const loadExampleProgram = (example: IExampleProgram) => {
    const keysTab = Object.keys(tabs).map((item) => Number(item));
    if (keysTab.length === 0) {
      Utils.Editor.addTab();
    }

    const updatedKeysTab = Object.keys(tabs).map((item) => Number(item));
    const currentTabKey = updatedKeysTab[currentTabIndex] ?? updatedKeysTab[0];
    const currentTab = tabs[currentTabKey];

    let targetTabKey = currentTabKey;

    const isCurrentEmpty = !currentTab || !currentTab.value || currentTab.value.trim().length === 0;

    if (!isCurrentEmpty) {
      Utils.Editor.addTab();
      // nuovo id tab (coerente con il reducer addNewTab)
      targetTabKey = tabCountID + 1;
    }

    Utils.Editor.changeTabName(targetTabKey, example.title);
    Utils.Editor.changeTabValue(targetTabKey, example.code);
  };

  const openExamplesPopoverAtButton = (e: React.MouseEvent) => {
    setExamplesPopover({ open: true, event: e.nativeEvent });
  };

  const openExamplesPopoverCentered = () => {
    setExamplesPopover({ open: true, event: undefined });
  };

  const handleShowMoreExamples = () => {
    setExamplesPopover({ open: false, event: undefined });
    setShowExamplesModal(true);
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
            {/* Examples (desktop) */}
            <IonButton
              title="Examples"
              color="tertiary"
              className="ion-hide-sm-down"
              onClick={openExamplesPopoverAtButton}
            >
              <IonIcon icon={codeSlashOutline} />
              <span className="margin-button-left">Examples</span>
            </IonButton>

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
          {/* side menu */}
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

          {/* main content */}
          <div id="main" className="main-side-editor">
            <Editor />
          </div>
        </IonSplitPane>

        <OpenProjectModal isOpen={showOpenModal} onDismiss={setShowOpenModal} />
        <SaveProjectModal isOpen={showSaveModal} onDismiss={setShowSaveModal} />
        <ShareProjectModal isOpen={showShareModal} onDismiss={setShowShareModal} />

        {/* Popover operations (mobile) */}
        <IonPopover
          data-testid="operations-popover"
          isOpen={buttonsPopover.open}
          event={buttonsPopover.event}
          onDidDismiss={() => setButtonsPopover({ open: false, event: undefined })}
        >
          <IonList>
            {/* Examples (mobile) */}
            <IonItem
              button={true}
              onClick={() => {
                setButtonsPopover({ open: false, event: undefined });
                openExamplesPopoverCentered();
              }}
              title="Examples"
            >
              <IonLabel>Examples</IonLabel>
              <IonIcon color="tertiary" icon={codeSlashOutline} slot="end" />
            </IonItem>

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

        {/* Popover Examples */}
        <IonPopover
          isOpen={examplesPopover.open}
          event={examplesPopover.event}
          onDidDismiss={() => setExamplesPopover({ open: false, event: undefined })}
        >
          <IonList>
            {visibleExamples.map((example) => (
              <IonItem
                key={example.id}
                button={true}
                onClick={() => {
                  loadExampleProgram(example);
                  setExamplesPopover({ open: false, event: undefined });
                }}
              >
                <IonLabel>{example.title}</IonLabel>
              </IonItem>
            ))}

            <IonItem button={true} onClick={handleShowMoreExamples}>
              <IonLabel>Show more…</IonLabel>
            </IonItem>
          </IonList>
        </IonPopover>

        {/* Modal Explorer Examples */}
        <ExampleExplorerModal
          isOpen={showExamplesModal}
          onDismiss={setShowExamplesModal}
          onSelectExample={loadExampleProgram}
        />
      </IonContent>
    </IonPage>
  );
};

export default MainTab;
