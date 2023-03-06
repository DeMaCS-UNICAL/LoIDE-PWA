import React, { useEffect , useState } from "react";
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
  IonModal,
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
  listCircleOutline,
  informationCircleOutline,
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

import { Steps } from "intro.js-react";
import "intro.js/introjs.css";
import introSteps from '../lib/introSteps.js';
import Select from 'react-select';

import battleshipDescription from '../assets/examples/battleshipDescription';
import saddlebagsDescription from '../assets/examples/saddlebagsDescription.js';
import saddlebagsExample from '../assets/examples/saddlebagsExample.json';
import battleshipExample from '../assets/examples/battleshipExample.json';

type MainTabPageProps = RouteComponentProps<{
  data: string;
}>;

const MainTab: React.FC<MainTabPageProps> = ({ match }) => {
	
  const [showExamplesModal, setShowExamplesModal] = useState<boolean>(false);	
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
	 Mousetrap.bind(["ctrl+e", "command+e"], () => {
      console.log(document.getElementById("main"));
      setShowExamplesModal(!showExamplesModal);
      return false;
    });
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
  }, [showExamplesModal,showOpenModal, showSaveModal, showShareModal]);

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
  
  const onExit = () => {}

   const options = {
      doneLabel: 'Done',
      dontShowAgain: true,
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

         <Steps enabled={true} steps={introSteps} initialStep={0} onExit={onExit} options={options} />

			<IonButton
				id = "examplesButton"
				title="Examples"
				color="white"
				className="ion-hide-sm-down"
				onClick={() => setShowExamplesModal(true)}
            >
				<IonIcon icon={listCircleOutline} />
				<span className="margin-button-left">Examples</span>
			</IonButton>

            <IonButton
				id = "openButton"
				title="Open"
				color="warning"
				className="ion-hide-sm-down"
				onClick={() => setShowOpenModal(true)}
            >
				<IonIcon icon={folderOpenOutline} />
				<span className="margin-button-left">Open</span>
			</IonButton>
            <IonButton
				id = "saveButton"
				title="Save"
				color="primary"
				className="ion-hide-sm-down"
				onClick={() => setShowSaveModal(true)}
            >
				<IonIcon icon={saveOutline} />
				<span className="margin-button-left">Save</span>
            </IonButton>
            <IonButton
				id = "shareButton"
				title="Share"
				color="success"
				className="ion-hide-sm-down"
				onClick={() => setShowShareModal(true)}
            >
				<IonIcon icon={shareOutline} />
				<span className="margin-button-left">Share</span>
			</IonButton>
            <IonButton
				id = "resetButton"
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
		    <ExamplesModal isOpen={showExamplesModal} onDismiss={setShowExamplesModal}/>
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
            <IonItem button={true} onClick={() => setShowExamplesModal(true)} title="Examples">
              <IonLabel>Examples</IonLabel>
              <IonIcon color="white" icon={listCircleOutline} slot="end" />
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
      </IonContent>
    </IonPage>
  );
};

interface ExamplesModalProps {
	isOpen: boolean;
	onDismiss: (value: boolean) => void;
  }
  
  const ExamplesModal: React.FC<ExamplesModalProps> = (props) => {
	  
	  const [showModal, setShowModal] = useState<boolean>(false);
  
	const options = [
		  { value: 'battleship', label: 'battleship' },
		  { value: 'saddlebags', label: 'saddlebags' },
	  ]
	  
	  const battleshipText = battleshipDescription;
	  const saddlebagsText = saddlebagsDescription;
	  const currentDescription = '';
    const infoDescription = "Select an example to see the description associated";

	function selectExample(currentDescription : any)
	{	

		if(document.getElementById("Examples")!.textContent != 'battleship' && document.getElementById("Examples")!.textContent != 'saddlebags')
		{
			currentDescription = "You must select one example to see the description";
		}
		if(document.getElementById("Examples")!.textContent == 'battleship')
		{
			currentDescription = battleshipText;
	Utils.Editor.changeTabValue(1,battleshipExample.tabs[0].value);
		}
		if(document.getElementById("Examples")!.textContent == 'saddlebags')
		{
			currentDescription = saddlebagsText;
	Utils.Editor.changeTabValue(1,saddlebagsExample.tabs[1].value);
		}
		(document.getElementById("MyTextArea") as HTMLInputElement)!.value = currentDescription;
	}

  function showInfoDescription()
  {
    (document.getElementById("MyTextArea") as HTMLInputElement)!.value = infoDescription;
  }

	useEffect(() => {
		setShowModal(props.isOpen);
	}, [props.isOpen]);

	const styleAnteprima = {
		resize: 'none',
		width: '300px',
    background:'none',
    border:'none'
	} as React.CSSProperties;

	const styleButton = {
		marginTop: '20px',
		width:'100%',
		height:'35px',
		backgroundColor: 'black',
		color: 'white',
		border: '1px solid white',
		borderRadius: '6px'
	} as React.CSSProperties;

	const styleDescriptionBox =
	{
		display:'flex',
		flexDirection:'column',
		alignItems:'center',
		marginTop: '50px',
	}as React.CSSProperties;

  const descriptionTitle =
  {
    display:'flex',
		flexDirection:'row',
		alignItems:'center',
  }as React.CSSProperties;

	const colourStyles = {
	menuList: (styles: any) => ({
		...styles,
		background: 'gray'
	}),
	option: (styles: any, {isFocused, isSelected}: any) => ({
		...styles,
		background: isFocused
			? 'lightgray'
			: isSelected
				? 'lightgray'
				: undefined,
		zIndex: 1
	}),
	menu: (base: any) => ({
		...base,
		zIndex: 100
	})
	}


	return (
	<IonModal isOpen={showModal} onDidDismiss={() => props.onDismiss(false)}>
	<IonHeader>
		<IonToolbar>
		<IonTitle>Select example from the list</IonTitle>
		<IonButtons slot="end">
			<IonButton color="primary" onClick={() => props.onDismiss(false)}>
			Close
			</IonButton>
		</IonButtons>
		</IonToolbar>
	</IonHeader>
	<IonContent className="ion-padding">
		<Select 
		id="Examples" 
		options={options}
		styles={colourStyles}
		/>
		<button 
		style={styleButton} 
		onClick={selectExample}
		>
		SELECT
		</button>
		<div style={styleDescriptionBox}>
    <div style={descriptionTitle}>
      <p>Description</p>
      <IonIcon icon={informationCircleOutline} onClick={showInfoDescription} />
    </div>
		<textarea readOnly
			rows={10}
			style={styleAnteprima}
			id="MyTextArea" 
			value={currentDescription}
		/>
		</div>
		</IonContent>
		</IonModal>
	);
};
export default MainTab;
