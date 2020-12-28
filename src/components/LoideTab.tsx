import { IonButton, IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import React from "react";
import { ReactNode } from "react";
import { Tab } from "react-tabs";
import useLongPress from "../hooks/useLongPress";

interface LoideTabProps {
    children: ReactNode;
    tabkey: number;
    onLongPress?: (key: number) => void;
    onContextMenu?: (key: number) => void;
    onDeleteTab: (key: number, e: any) => void;
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

    const longPressEvent = useLongPress(
        onTabLongPress,
        () => {},
        defaultOptions
    );

    const onClick = (e: any) => {
        e.preventDefault();
        if (onContextMenu) onContextMenu(tabkey);
    };

    return (
        <Tab {...otherProps} onContextMenu={onClick} {...longPressEvent}>
            <span className="unselectable">{children}</span>
            <IonButton
                title="Delete tab"
                size="small"
                color="danger"
                fill="clear"
                onClick={(e) => {
                    if (onDeleteTab) onDeleteTab(tabkey, e);
                }}
            >
                <IonIcon icon={closeOutline} />
            </IonButton>
        </Tab>
    );
};

LoideTab.tabsRole = "Tab"; // Required field to use your custom Tab

export default LoideTab;
