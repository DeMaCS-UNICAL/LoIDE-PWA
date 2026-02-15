import { useDispatch, useSelector } from "react-redux";
import {
  setDarkMode as setDarkModeState,
  setFontSizeEditor as setFontSizeEditorState,
  UIStatusSelector,
} from "../redux/slices/UIStatus";

const useAppearance = () => {
  const dispatch = useDispatch();

  const {
    darkMode,
    fontSizeEditor,
    connectingToTheServer,
    fontSizeOutput,
    loadingFiles,
    newOutput,
  } = useSelector(UIStatusSelector);

  const setDarkMode = (value: boolean) => {
    dispatch(setDarkModeState(value));
  };

  const setFontSizeEditor = (value: number) => {
    dispatch(setFontSizeEditorState(value));
  };

  return {
    darkMode,
    fontSizeEditor,
    connectingToTheServer,
    fontSizeOutput,
    loadingFiles,
    newOutput,
    setDarkMode,
    setFontSizeEditor,
  };
};

export default useAppearance;
