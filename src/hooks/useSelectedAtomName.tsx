import { useCallback, useState } from "react";

/**
 * Hook that return the atom name and update it getting the text from the mouse selection
 */
export const useSelectedAtomName = () => {
  const [atomNameSelected, setNameAtomSelected] = useState<string>("");

  // take the selected text and check if it is an atom name and update it
  const updateSelectedText = (e?: React.MouseEvent) => {
    const selectedText = window.getSelection()?.toString();

    if (!selectedText) {
      resetSelection();
      return;
    }
    if (isValidAtom(selectedText)) {
      const atomName = getAtomName(selectedText);

      setNameAtomSelected(atomName);
    } else resetSelection();

    e?.stopPropagation();
  };

  // reset the selected text
  const resetSelection = () => setNameAtomSelected("");

  // checks if the test is a valid atom name
  const isValidAtom = useCallback(
    (text: string): boolean => {
      const regex = /([a-zA-Z]\w*)/;

      let res: boolean;

      try {
        res = regex.test(text);
        return res;
      } catch (err) {
        return false;
      }
    },

    [],
  );

  const getAtomName = useCallback((text: string): string => {
    const regex = /^([a-zA-Z]\w*)/;

    try {
      const res = regex.exec(text);
      if (res && res.length > 0) return res[0];
      return "";
    } catch (err) {
      return "";
    }
  }, []);

  return { atomNameSelected, resetSelection, updateSelectedText };
};

export default useSelectedAtomName;
