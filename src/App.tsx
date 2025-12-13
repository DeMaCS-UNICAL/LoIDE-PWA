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
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  codeSlashOutline,
  documentTextOutline,
  cog,
  informationCircleOutline,
  colorPaletteOutline,
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
import * as API from "./lib/api";
import { LocalStorageItems, LoidePath } from "./lib/constants";
import AppearanceTab from "./pages/AppearanceTab";
import Utils from "./lib/utils";
import { useDispatch } from "react-redux";
import { setLanguages } from "./redux/slices/LanguagesData";
import Mousetrap from "mousetrap";
import ShortcutsModal from "./modals/ShortcutsModal";
import useOutput from "./hooks/useOutput";

setupIonicReact();

const App: React.FC = () => {
  const dispatch = useDispatch();

  const [showShortcutsModal, setShowShortcutsModal] = useState<boolean>(false);
  const { newOutput, setNewOutput, resetNewOutputBadge } = useOutput();

  useEffect(() => {
    API.createSocket();

    API.setGetLanguagesListener((output) => {
      dispatch(setLanguages(output));
    });

    API.setRunProjectListener(setNewOutput);

    return () => API.disconnectAndClearSocket();
  }, [dispatch, setNewOutput]);

  useEffect(() => {
    const button = document.querySelector(".output-tab-button");
    button?.addEventListener("click", () => {
      resetNewOutputBadge();
    });

    window.onbeforeunload = function () {
      const loideProject = Utils.getLoideProjectData();
      localStorage.setItem(LocalStorageItems.loideProject, JSON.stringify(loideProject));
    };
  }, [resetNewOutputBadge]);

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
            <Route exact path={`/${LoidePath.Editor}/:data?`} component={MainTab} />
            <Route exact path={`/${LoidePath.RunSettings}`} component={RunSettingsTab} />
            <Route path={`/${LoidePath.Output}`} component={OutputTab} />
            <Route path={`/${LoidePath.Appearance}`} component={AppearanceTab} />
            <Route exact path={`/${LoidePath.About}`} component={AboutTab} />
            <Route exact path="/" render={() => <Redirect to={`/${LoidePath.Editor}`} />} />
            {/* <Route component={MainTab} /> */}
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab={LoidePath.Editor} href={`/${LoidePath.Editor}`}>
              <IonIcon icon={codeSlashOutline} />
              <IonLabel>Editor</IonLabel>
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
              {newOutput && <IonBadge color="success">!</IonBadge>}
            </IonTabButton>

            <IonTabButton tab={LoidePath.Appearance} href={`/${LoidePath.Appearance}`}>
              <IonIcon icon={colorPaletteOutline} />
              <IonLabel>Appearance</IonLabel>
            </IonTabButton>

            <IonTabButton tab={LoidePath.About} href={`/${LoidePath.About}`}>
              <IonIcon icon={informationCircleOutline} />
              <IonLabel>About</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
        <ShortcutsModal isOpen={showShortcutsModal} onDismiss={setShowShortcutsModal} />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
