import { useDispatch, useSelector } from "react-redux";
import { outputSelector, setEmpty } from "../redux/slices/Output";
import { UIStatusSelector } from "../redux/slices/UIStatus";
import Utils from "../lib/utils";

const useOutput = () => {
  const dispatch = useDispatch();

  const { model, error } = useSelector(outputSelector);
  const { newOutput } = useSelector(UIStatusSelector);

  const resetNewOutput = () => {
    Utils.removeNewOutputBadge();
  };

  const setNewOutput = () => {
    Utils.addNewOutputBadge();
  };

  const clearOutput = () => {
    dispatch(setEmpty());
  };

  return {
    model,
    error,
    newOutput,
    clearOutput,
    resetNewOutput,
    setNewOutput,
  };
};
export default useOutput;
