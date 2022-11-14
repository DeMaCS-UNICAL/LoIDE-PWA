import React, { useEffect, useState } from "react";

import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonBadge,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  codeSlashOutline,
  documentTextOutline,
  cog,
  informationCircleOutline,
  colorPaletteOutline,
  peopleCircleOutline,
  list,
} from "ionicons/icons";
import MainTab from "./pages/MainTab";
import RunSettingsTab from "./pages/RunSettingsTab";
import OutputTab from "./pages/OutputTab";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.scss";

import "./global.scss";
import AboutTab from "./pages/AboutTab";
import CollaborativeTab from "./pages/CollaborativeTab";
import ExamplesTab from "./pages/ExamplesTab";
import * as API from "./lib/api";
import { IOutputData } from "./lib/LoideAPIInterfaces";
import { LocalStorageItems, LoidePath } from "./lib/constants";
import AppearanceTab from "./pages/AppearanceTab";
import Utils from "./lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { UIStatusSelector } from "./redux/slices/UIStatus";
import { setError, setModel } from "./redux/slices/Output";
import { setLanguages } from "./redux/slices/LanguagesData";
import Mousetrap from "mousetrap";
import ShortcutsModal from "./modals/ShortcutsModal";

const App: React.FC = () => {
  const dispatch = useDispatch();

  const [showShortcutsModal, setShowShortcutsModal] = useState<boolean>(false);

  const { newOutput } = useSelector(UIStatusSelector);

  useEffect(() => {
    API.createSocket();

    API.setGetLanguagesListener((output) => {
      dispatch(setLanguages(output));
    });

    API.setRunProjectListener((output: IOutputData) => {
      dispatch(setModel(output.model));
      dispatch(setError(output.error));

      Utils.addNewOutputBadge();
    });

    return () => API.disconnectAndClearSocket();
  }, [dispatch]);

  useEffect(() => {
    const button = document.querySelector(".output-tab-button");
    button?.addEventListener("click", () => {
      Utils.removeNewOutputBadge();
    });

    window.onbeforeunload = function () {
      const loideProject = Utils.getLoideProjectData();
      localStorage.setItem(LocalStorageItems.loideProject, JSON.stringify(loideProject));
    };
  }, []);

  useEffect(() => {
    Mousetrap.bind("?", () => {
      setShowShortcutsModal(!showShortcutsModal);
      return false;
    });
    Mousetrap.bind(["ctrl+enter", "command+enter"], () => {
      const dataToRun = Utils.getLoideRunData();
      API.emitRunProject(dataToRun);
      return false;
    });

    return () => {
      Mousetrap.unbind("?");
      Mousetrap.unbind(["ctrl+enter", "command+enter"]);
    };
  }, [showShortcutsModal]);

  useEffect(() => {
    API.emitGetLanguages();
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
	 <IonTabs>
          <IonRouterOutlet>
            <Route path={`/${LoidePath.Editor}/:data`} component={MainTab} exact={true} />
	    <Route path={`/${LoidePath.RunSettings}`} component={RunSettingsTab} exact={true} />
            <Route path={`/${LoidePath.Output}`} component={OutputTab} />
            <Route path={`/${LoidePath.Appearance}`} component={AppearanceTab} />
            <Route path={`/${LoidePath.About}`} component={AboutTab} />
			<Route path="/CollaborativeTab" component={CollaborativeTab} />
			<Route path={`/${LoidePath.Examples}`} component={ExamplesTab} />
			<Route path="/" render={() => <Redirect to={`/${LoidePath.Editor}`} />} exact={true} />
            <Route component={MainTab} />
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab={LoidePath.Editor} href={`/${LoidePath.Editor}`}>
		  <IonIcon icon={codeSlashOutline} />
              <IonLabel>Editor</IonLabel>
            </IonTabButton>

            <IonTabButton tab={LoidePath.Examples} href={`/${LoidePath.Examples}`}>
              <IonIcon icon={list} />
              <IonLabel>Examples</IonLabel>
            </IonTabButton>

            <IonTabButton
              tab={LoidePath.RunSettings}
              href={`/${LoidePath.RunSettings}`}
              className="ion-hide-lg-up"
            >
              <IonIcon icon={cog} />
              <IonLabel>Run Settings</IonLabel>
	      </IonTabButton>

            <IonTabButton
              tab={LoidePath.Output}
              href={`/${LoidePath.Output}`}
              className="output-tab-button"
            >
              <IonIcon icon={documentTextOutline} />
              <IonLabel>Output</IonLabel>
              {newOutput && <IonBadge color="danger">!</IonBadge>}
            </IonTabButton>

            <IonTabButton tab={LoidePath.Appearance} href={`/${LoidePath.Appearance}`}>
              <IonIcon icon={colorPaletteOutline} />
              <IonLabel>Appearance</IonLabel>
            </IonTabButton>

            <IonTabButton tab={LoidePath.About} href={`/${LoidePath.About}`}>
              <IonIcon icon={informationCircleOutline} />
              <IonLabel>About</IonLabel>
            </IonTabButton>
			
			<IonTabButton href="/CollaborativeTab">
              <IonIcon icon={peopleCircleOutline} />
              <IonLabel>Live ChatEditor</IonLabel>
            </IonTabButton>
			
          </IonTabBar>
        </IonTabs>
        <ShortcutsModal isOpen={showShortcutsModal} onDismiss={setShowShortcutsModal} />
      </IonReactRouter>
    </IonApp>
   );
};

export default App;
