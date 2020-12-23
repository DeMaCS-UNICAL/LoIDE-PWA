import React, { useEffect, useRef, useState } from "react";
import LoideAceEditor from "./LoideAceEditor";
import { Tabs, TabList, TabPanel } from "react-tabs";
import { EditorStore, RunSettingsStore, UIStatusStore } from "../lib/store";
import {
    ActionSheet,
    ButtonText,
    Inputs,
    WindowConfirmMessages,
} from "../lib/constants";
import { IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import LoideTab from "./LoideTab";
import LoideToolbarEditor from "./LoideToolbarEditor";
import AceEditor from "react-ace";
import Utils from "../lib/utils";
import { useIsDarkMode } from "../hooks/useIsDarkMode";
import { alertController, actionSheetController } from "@ionic/core";

const Editor: React.FC = () => {
    const tabCountID = EditorStore.useState((e) => e.tabCountID);
    const tabIndex = EditorStore.useState((e) => e.currentTab);
    const tabs = EditorStore.useState((e) => e.tabs);
    const prevTabsSize = EditorStore.useState((l) => l.prevTabsSize);
    const currentLanguage = RunSettingsStore.useState((s) => s.currentLanguage);
    const currentSolver = RunSettingsStore.useState((s) => s.currentSolver);

    const [currentTabKey, setCurrentTabKey] = useState<number>(tabCountID);

    const editorsRef = useRef<AceEditor>(null);

    const [editorSessions, setEditorSessions] = useState<any[]>([]);

    const darkMode = useIsDarkMode();

    const fontEditorSize = UIStatusStore.useState((u) => u.fontSizeEditor);

    // set the current tab ID depending on selected tab
    useEffect(() => {
        let keysTab = [...tabs.keys()];
        setCurrentTabKey(keysTab[tabIndex]);
    }, [tabIndex, tabs]);

    useEffect(() => {
        if (tabs.size > prevTabsSize) {
            var arr = document.getElementsByClassName("react-tabs__tab");
            arr[arr.length - 1].scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [prevTabsSize, tabs.size]);

    const onChange = (tabKey: number, value: string) => {
        Utils.Editor.changeTabValue(tabKey, value);
    };

    const onSelectTab = (index: number) => {
        Utils.Editor.selectTab(index);
    };

    const deleteTab = (tabKey: number) => {
        if (tabs.size === 1) {
            setEditorSessions([]);
            Utils.Editor.resetInput();
            return;
        }
        // delete tab session
        let newSessions = [...editorSessions];
        delete newSessions[tabKey];
        setEditorSessions(newSessions);

        Utils.Editor.deleteTab(tabKey);
    };

    const showDeleteTabAlert = (tabKey: number, e: any) => {
        e.stopPropagation();

        alertController
            .create({
                message: WindowConfirmMessages.DeleteTab.message,
                header: WindowConfirmMessages.DeleteTab.header,
                buttons: [
                    { text: "Cancel" },
                    {
                        text: "Delete",
                        handler: () => deleteTab(tabKey),
                    },
                ],
            })
            .then((alert) => alert.present());
    };

    const addTab = () => {
        Utils.Editor.addTab();
    };

    const undo = () => {
        let undoManager = editorsRef.current?.editor.session.getUndoManager();
        undoManager?.undo(editorsRef.current?.editor.session!);
    };

    const redo = () => {
        let undoManager = editorsRef.current?.editor.session.getUndoManager();
        undoManager?.redo(editorsRef.current?.editor.session!);
    };

    const search = () => {
        editorsRef.current?.editor.execCommand("find");
    };

    const cut = () => {
        let stringToCopy = editorsRef.current?.editor.getCopyText();
        if (stringToCopy) {
            Utils.copyTextToClipboard(stringToCopy);
            editorsRef.current?.editor.execCommand("cut");
        }
    };

    const copy = () => {
        let stringToCopy = editorsRef.current?.editor.getCopyText();
        if (stringToCopy) Utils.copyTextToClipboard(stringToCopy);
    };

    const paste = () => {
        Utils.getTextFromClipboard((textFromClipboard) => {
            editorsRef.current?.editor.insert(textFromClipboard);
        });
    };

    const downloadTab = () => {
        let currentTab = tabs.get(currentTabKey);
        if (currentTab) {
            let tabContent = currentTab.value;
            let tabTitle = currentTab.title;
            Utils.downloadTextFile(tabTitle, tabContent);
        }
    };

    const onSaveSession = (tabKey: number, session: any) => {
        let newSessions = [...editorSessions];
        newSessions[tabKey] = session;
        setEditorSessions(newSessions);
    };

    const showRenameAlert = (tabKey: number) => {
        alertController
            .create({
                message: WindowConfirmMessages.RenameTab.message,
                header: WindowConfirmMessages.RenameTab.header,

                inputs: [
                    {
                        name: Inputs.RenameTab.name,
                        type: "text",
                        placeholder: Inputs.RenameTab.placeholder,
                    },
                ],
                buttons: [
                    { text: ButtonText.Cancel },
                    {
                        text: ButtonText.Rename,
                        handler: (data) =>
                            Utils.Editor.changeTabName(tabKey, data.rename),
                    },
                ],
            })
            .then((alert) => alert.present());
    };

    const showTabActionSheet = (tabKey: number) => {
        actionSheetController
            .create({
                header: ActionSheet.Tab,
                buttons: [
                    {
                        text: ButtonText.Rename,
                        handler: () => showRenameAlert(tabKey),
                    },
                    {
                        text: ButtonText.Duplicate,
                        handler: () => Utils.Editor.duplicateTab(tabKey),
                    },
                    {
                        text: ButtonText.ClearContent,
                        handler: () => Utils.Editor.clearTabValue(tabKey),
                    },
                    {
                        text: ButtonText.SaveContent,
                        handler: () => {
                            let tab = tabs.get(tabKey);
                            if (tab) Utils.Editor.saveTabContent(tab);
                        },
                    },
                    {
                        text: ButtonText.Delete,
                        role: "destructive",
                        handler: () => {
                            showDeleteTabAlert(tabKey, new Event("click"));
                        },
                    },
                    {
                        text: ButtonText.Cancel,
                        role: "cancel",
                    },
                ],
            })
            .then((alert) => {
                alert.present();
            });
    };

    const loideTabs = [...tabs.keys()].map((key) => (
        <LoideTab
            key={`tab-${key}`}
            tabkey={key}
            onDeleteTab={showDeleteTabAlert}
            onLongPress={showTabActionSheet}
            onContextMenu={showTabActionSheet}
        >
            {tabs.get(key)!.title}
        </LoideTab>
    ));

    const tabPanels = [...tabs.keys()].map((key) => (
        <TabPanel key={`tabpanel-${key}`}>
            <LoideAceEditor
                ref={editorsRef}
                tabKey={key}
                session={editorSessions[key]}
                mode={currentLanguage}
                solver={currentSolver}
                value={tabs.get(key)!.value}
                darkTheme={darkMode}
                fontSize={fontEditorSize}
                onChange={onChange}
                onSaveSession={onSaveSession}
            />
        </TabPanel>
    ));

    return (
        <div className="loide-editor">
            <Tabs
                className="loide-tabs"
                selectedIndex={tabIndex}
                onSelect={onSelectTab}
            >
                <div className="loide-tab-list">
                    <div className="loide-tab-list-container">
                        <TabList>{loideTabs}</TabList>
                    </div>
                    <div className="loide-tab-list-operation">
                        <button
                            title="Add tab"
                            className="tab-button"
                            style={{ marginLeft: "1px" }}
                            onClick={addTab}
                        >
                            <IonIcon
                                style={{ fontSize: "20px" }}
                                color="dark"
                                icon={addOutline}
                            />
                        </button>
                        <div
                            className="ion-hide-sm-down"
                            style={{ marginLeft: "5px" }}
                        >
                            <LoideToolbarEditor
                                onUndo={undo}
                                onRedo={redo}
                                onSearch={search}
                                onCut={cut}
                                onCopy={copy}
                                onPaste={paste}
                                onDownloadTab={downloadTab}
                            />
                        </div>
                    </div>
                </div>
                <div className="loide-tab-list only-toolbar ion-hide-sm-up">
                    <LoideToolbarEditor
                        onUndo={undo}
                        onRedo={redo}
                        onSearch={search}
                        onCut={cut}
                        onCopy={copy}
                        onPaste={paste}
                        onDownloadTab={downloadTab}
                    />
                </div>
                {tabPanels}
            </Tabs>
        </div>
    );
};

export default Editor;
