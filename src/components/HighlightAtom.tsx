import React, { useMemo, useState } from "react";
import Utils from "../lib/utils";

export interface HighlightAtomProps {
  text: string;
  highlight: string;
}

const HighlightAtom: React.FC<HighlightAtomProps> = ({ text, highlight }) => {
  const [selectedColor, setSelectedColor] = useState(Utils.getRandomColor());

  const highlightAtomStyle: React.CSSProperties = useMemo(
    () => ({ color: `#${selectedColor}`, fontWeight: "bold" }),
    [selectedColor],
  );

  if (!highlight.trim()) {
    return <span>{text}</span>;
  }

  const atom = new RegExp(`(${highlight})([(]|[.])`);
  const atomNameRegex = /^([a-zA-Z]\w*)/;
  const parts = text.split(atom);

  const changeSelectedColor = () => setSelectedColor(Utils.getRandomColor());

  return (
    <>
      {parts.filter(String).map((part, i) => {
        return part === highlight && atomNameRegex.test(part) ? (
          <span style={highlightAtomStyle} key={i} onClick={changeSelectedColor}>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </>
  );
};

export default HighlightAtom;
