import { IonButton, IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { Tab } from "react-tabs";
import useLongPress from "../hooks/useLongPress";

interface LoideTabProps {
  children: React.ReactNode;
  tabkey: number;
  onLongPress?: (key: number) => void;
  onContextMenu?: (key: number) => void;
  onDeleteTab: (key: number, e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => void;
}
const LoideTab = ({
  children,
  tabkey,
  onLongPress,
  onDeleteTab,
  onContextMenu,
  ...otherProps
}: LoideTabProps) => {
  const onTabLongPress = () => {
    if (onLongPress) onLongPress(tabkey);
  };

  const defaultOptions = {
    shouldPreventDefault: false,
    delay: 500,
  };

  const longPressEvent = useLongPress(onTabLongPress, undefined, defaultOptions);

  const handleTabRightClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();
    if (onContextMenu) onContextMenu(tabkey);
  };

  const handleDeleteTabClick = (e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => {
    if (onDeleteTab) onDeleteTab(tabkey, e);
  };

  return (
    <Tab {...otherProps} onContextMenu={handleTabRightClick} {...longPressEvent}>
      <span className="unselectable">{children}</span>
      <IonButton
        title="Delete tab"
        size="small"
        color="danger"
        fill="clear"
        onClick={handleDeleteTabClick}
      >
        <IonIcon icon={closeOutline} />
      </IonButton>
    </Tab>
  );
};

LoideTab.tabsRole = "Tab"; // Required field to use your custom Tab

export default LoideTab;
