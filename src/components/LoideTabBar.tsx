import React from "react";
import { useLocation } from "react-router-dom";
import { IonBadge, IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import {
  codeSlashOutline,
  documentTextOutline,
  cog,
  informationCircleOutline,
  colorPaletteOutline,
} from "ionicons/icons";
import { LoidePath } from "../lib/constants";

interface LoideTabBarProps {
  newOutput: boolean;
  outputPanelVisible: boolean;
}

const LoideTabBar: React.FC<LoideTabBarProps> = ({ newOutput, outputPanelVisible }) => {
  const location = useLocation();
  const onEditorTab =
    location.pathname === `/${LoidePath.Editor}` ||
    location.pathname.startsWith(`/${LoidePath.Editor}/`);

  // Show tab bar badge only when NOT on editor tab (since editor has its own side panel badge)
  const showTabBarBadge = newOutput && !outputPanelVisible && !onEditorTab;

  return (
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
        {showTabBarBadge && <IonBadge color="success">!</IonBadge>}
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
  );
};

export default LoideTabBar;
