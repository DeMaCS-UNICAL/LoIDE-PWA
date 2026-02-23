import { useMemo, useState, useCallback } from "react";
import { EXAMPLE_PROGRAMS, IExampleProgram } from "../lib/examples";
import { useSelector } from "react-redux";
import { editorSelector } from "../redux/slices/Editor";
import Utils from "../lib/utils";

export const useLogicProgramExamples = () => {
  const { tabCountID, currentTabIndex, tabs } = useSelector(editorSelector);

  const examples = useMemo(() => EXAMPLE_PROGRAMS, []);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedExample = useMemo(
    () => examples.find((e) => e.id === selectedId) || null,
    [examples, selectedId]
  );

  const selectExample = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const loadExampleIntoEditor = useCallback(
    (example: IExampleProgram) => {
      const keysTab = Object.keys(tabs).map((item) => Number(item));
      if (keysTab.length === 0) {
        Utils.Editor.addTab();
      }

      const updatedKeysTab = Object.keys(tabs).map((item) => Number(item));
      const currentTabKey = updatedKeysTab[currentTabIndex] ?? updatedKeysTab[0];
      const currentTab = tabs[currentTabKey];

      let targetTabKey = currentTabKey;

      const isCurrentEmpty =
        !currentTab || !currentTab.value || currentTab.value.trim().length === 0;

      if (!isCurrentEmpty) {
        Utils.Editor.addTab();
        targetTabKey = tabCountID + 1;
      }

      Utils.Editor.changeTabName(targetTabKey, example.title);
      Utils.Editor.changeTabValue(targetTabKey, example.code);
    },
    [tabs, currentTabIndex, tabCountID]
  );

  return {
    examples,
    selectedExample,
    selectExample,
    loadExampleIntoEditor,
  };
};