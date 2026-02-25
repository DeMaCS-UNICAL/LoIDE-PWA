import { useDispatch, useSelector } from "react-redux";
import { outputSelector, setEmpty, setError, setModel } from "../redux/slices/Output";
import {
  UIStatusSelector,
  setOutputPanelVisible as setOutputPanelVisibleState,
} from "../redux/slices/UIStatus";
import Utils from "../lib/utils";
import { IOutputData } from "../lib/LoideAPIInterfaces";
import { useCallback } from "react";

const useOutput = () => {
  const dispatch = useDispatch();

  const { model, error } = useSelector(outputSelector);
  const { newOutput, outputPanelVisible } = useSelector(UIStatusSelector);

  const resetNewOutputBadge = useCallback(() => {
    Utils.removeNewOutputBadge();
  }, []);

  const setNewOutputBadge = useCallback(() => {
    Utils.addNewOutputBadge();
  }, []);

  const clearOutput = useCallback(() => {
    dispatch(setEmpty());
  }, [dispatch]);

  const setNewOutput = useCallback(
    (output: IOutputData) => {
      // Dispatch action to set new model output
      dispatch(setModel(output.model));
      dispatch(setError(output.error));
      setNewOutputBadge();
    },
    [dispatch, setNewOutputBadge],
  );

  const setOutputPanelVisible = useCallback(
    (visible: boolean) => {
      dispatch(setOutputPanelVisibleState(visible));
    },
    [dispatch],
  );

  return {
    model,
    error,
    newOutput,
    outputPanelVisible,
    clearOutput,
    resetNewOutputBadge,
    setNewOutputBadge,
    setNewOutput,
    setOutputPanelVisible,
  };
};
export default useOutput;
