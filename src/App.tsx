import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonTabs, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
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
import LoideTabBar from "./components/LoideTabBar";

setupIonicReact();

const App: React.FC = () => {
  const dispatch = useDispatch();

  const [showShortcutsModal, setShowShortcutsModal] = useState<boolean>(false);
  const { newOutput, outputPanelVisible, setNewOutput } = useOutput();

  useEffect(() => {
    API.createSocket();

    API.setGetLanguagesListener((output) => {
      dispatch(setLanguages(output));
    });

    API.setRunProjectListener(setNewOutput);

    return () => API.disconnectAndClearSocket();
  }, [dispatch, setNewOutput]);

  useEffect(() => {
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
            <Route exact path={`/${LoidePath.Editor}/:data?`} component={MainTab} />
            <Route exact path={`/${LoidePath.RunSettings}`} component={RunSettingsTab} />
            <Route path={`/${LoidePath.Output}`} component={OutputTab} />
            <Route path={`/${LoidePath.Appearance}`} component={AppearanceTab} />
            <Route exact path={`/${LoidePath.About}`} component={AboutTab} />
            <Route exact path="/" render={() => <Redirect to={`/${LoidePath.Editor}`} />} />
            {/* <Route component={MainTab} /> */}
          </IonRouterOutlet>

          <LoideTabBar newOutput={newOutput} outputPanelVisible={outputPanelVisible} />
        </IonTabs>
        <ShortcutsModal isOpen={showShortcutsModal} onDismiss={setShowShortcutsModal} />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
