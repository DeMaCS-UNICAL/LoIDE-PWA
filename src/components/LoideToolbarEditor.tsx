import { IonIcon } from "@ionic/react";
import {
  arrowRedoOutline,
  arrowUndoOutline,
  clipboardOutline,
  copyOutline,
  cutOutline,
  downloadOutline,
  searchOutline,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import Utils from "../lib/utils";

interface LoideToolbarEditorProps {
  onUndo: () => void;
  onRedo: () => void;
  onSearch: () => void;
  onCut: () => void;
  onCopy: () => void;
  onPaste?: () => void;
  onDownloadTab: () => void;
  onAspChefClick?: () => void;
}

const LoideToolbarEditor: React.FC<LoideToolbarEditorProps> = (props) => {
  const [pasteSupported, setPasteSupported] = useState<boolean>(false);
  const [writeClipboardSupported, setWriteClipboardSupported] = useState<boolean>(false);

  useEffect(() => {
    setPasteSupported(Utils.isClipboardReadSupported());
    setWriteClipboardSupported(Utils.isClipboardWriteSupported());
  }, []);

  return (
    <div>
      <button title="Download content" className="tab-button" onClick={props.onDownloadTab}>
        <IonIcon color="dark" style={{ fontSize: "20px" }} icon={downloadOutline} />
      </button>

      {writeClipboardSupported && (
        <>
          <button title="Cut" className="tab-button space-left" onClick={props.onCut}>
            <IonIcon color="dark" style={{ fontSize: "20px" }} icon={cutOutline} />
          </button>

          <button title="Copy" className="tab-button" onClick={props.onCopy}>
            <IonIcon color="dark" style={{ fontSize: "20px" }} icon={copyOutline} />
          </button>
        </>
      )}

      {pasteSupported && (
        <button title="Paste" className="tab-button" onClick={props.onPaste}>
          <IonIcon color="dark" style={{ fontSize: "20px" }} icon={clipboardOutline} />
        </button>
      )}

      <button title="Search" className="tab-button space-left" onClick={props.onSearch}>
        <IonIcon color="dark" style={{ fontSize: "20px" }} icon={searchOutline} />
      </button>
      <button title="Undo" className="tab-button space-left" onClick={props.onUndo}>
        <IonIcon color="dark" style={{ fontSize: "20px" }} icon={arrowUndoOutline} />
      </button>
      <button title="Redo" className="tab-button" onClick={props.onRedo}>
        <IonIcon color="dark" style={{ fontSize: "20px" }} icon={arrowRedoOutline} />
      </button>
    </div>
  );
};

export default LoideToolbarEditor;
