import { useSelectedAtomName } from "../hooks/useSelectedAtomName";
import React, { useRef } from "react";
import HighlightAtom from "./HighlightAtom";
import { useSelector } from "react-redux";
import { currentLanguageSelector } from "../redux/slices/RunSettings";
import { LoideLanguages } from "../lib/constants";
import useOutsideMouseEvent from "../hooks/useOutsideMouseEvent";

interface OutputProps {
  model: string;
  error: string;
  fontSize?: number;
}

const Output: React.FC<OutputProps> = ({ model, error, fontSize = 20 }) => {
  const { atomNameSelected, resetSelection, updateSelectedText } = useSelectedAtomName();

  const language = useSelector(currentLanguageSelector);

  const containerRef = useRef(null);

  // reset the atom highlight when double clicking outside the container
  useOutsideMouseEvent(containerRef.current, resetSelection, "dblclick");

  return (
    <div
      className="loide-output"
      style={{ fontSize: `${fontSize}px` }}
      onDoubleClick={resetSelection}
      ref={containerRef}
    >
      <div className="output-content ion-padding">
        <div className="output-model" onDoubleClick={updateSelectedText}>
          {language === LoideLanguages.ASP.name || language === LoideLanguages.DATALOG.name ? (
            <HighlightAtom text={model} highlight={atomNameSelected} />
          ) : (
            model
          )}
        </div>
        <div className={`output-error ${error.length === 0 ? "" : "ion-margin-top"}`}>{error}</div>
      </div>
    </div>
  );
};

export default Output;
