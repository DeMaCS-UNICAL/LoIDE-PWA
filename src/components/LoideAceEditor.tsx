import React, { useEffect, useRef, useState } from "react";
import AceEditor from "react-ace";

import "../lib/ace/mode-asp";
import "../lib/ace/mode-datalog";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-idle_fingers";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-min-noconflict/ext-searchbox";

import ace from "ace-builds/src-noconflict/ace";
import { LoideLanguages, LoideSolvers } from "../lib/constants";
import { getAspCompletions } from "../lib/ace/dlv2/autocomplete-dicts";

const createEditSession = (session: any) => {
  const editSession = new ace.EditSession(session.value);
  editSession.setAnnotations(session.annotations);
  editSession.setBreakpoints(session.breakpoints);
  editSession.setUndoManager(new ace.UndoManager());
  editSession.$undoManager.$undoStack = session.history.undo;
  editSession.$undoManager.$redoStack = session.history.redo;
  editSession.setScrollLeft(session.scrollLeft);
  editSession.setScrollTop(session.scrollTop);
  editSession.selection.fromJSON(session.selection);
  return editSession;
};

interface LoideAceEditorProps {
  mode: string;
  darkTheme: boolean;
  solver: string;
  tabKey: number;
  value?: string;
  runAuto?: boolean;
  session?: any;
  fontSize?: number;

  onChange?: (tabKey: number, value: string, runAuto: boolean) => void;
  onFocus?: (tabKey: number, e: any) => void;
  onSaveSession?: (tabKey: number, session: any) => void;
}

const defaultFontSize = 12;

const LoideAceEditor = React.forwardRef<AceEditor, LoideAceEditorProps>((props, forwardRef) => {
  const reactAce = useRef<AceEditor>(null);
  const [fontSize, setFontSize] = useState<number>(defaultFontSize);

  useEffect(() => {
    if (fontSize !== props.fontSize && props.fontSize) setFontSize(props.fontSize);
  }, [fontSize, props.fontSize]);

  // restore session
  useEffect(() => {
    const edt = reactAce.current;
    const editor = edt?.editor;
    if (edt && editor && props.session) {
      const sessionToRestore = JSON.parse(props.session);
      const newSession = createEditSession(sessionToRestore);
      editor.setSession(newSession);
    }
    return () => {
      const edt = reactAce.current;
      const editor = edt?.editor;
      if (edt && props.onSaveSession && editor) {
        const sessionToSave = JSON.stringify(editor.getSession());
        props.onSaveSession(props.tabKey, sessionToSave);
      }
    };
  }, []);

  // forwardRef
  useEffect(() => {
    if (typeof forwardRef === "function" && reactAce) {
      forwardRef(reactAce.current);
    } else {
      (forwardRef as any).current = reactAce.current;
    }
  }, [reactAce, forwardRef]);

  // mode
  useEffect(() => {
    const edt = reactAce.current;
    if (edt) {
      const supported = Object.values(LoideLanguages).find(
        (l) => l.name === props.mode && l.highlightSupport,
      );
      if (supported) {
        edt.editor.getSession().setMode("ace/mode/" + props.mode);
      } else {
        edt.editor.getSession().setMode("ace/mode/text");
      }
    }
  }, [props.mode]);

  const langTools = ace.require("ace/ext/language_tools");

  const languageChosen = props.mode;
  const solverChosen = props.solver;

  const getTrigger = (session: any, pos: any): string | undefined => {
    const line = session.getLine(pos.row);
    let i = pos.column - 1;
    const valid = /[ (,a-zA-Z0-9_#:-]/;
    while (i >= 0 && valid.test(line[i])) {
      if (["#", ";", ",", " "].includes(line[i])) return line[i];
      i--;
    }
    return undefined;
  };

  const inizializeSnippets = () => {
    langTools.setCompleters([]);

    if (languageChosen !== LoideLanguages.ASP.name) return;

    if (solverChosen === LoideSolvers.DLV || solverChosen === LoideSolvers.DLV2) {
      const baseCompleter = {
        identifierRegexps: [/[a-zA-Z0-9_#:-]/],
        getCompletions: (_ed: any, _s: any, _p: any, _pre: any, cb: any) => {
          cb(null, [
            { caption: "#int", snippet: "#int", meta: "keyword" },
            { caption: ":-", snippet: ":- ${1:body}.", meta: "constraint" },
            { caption: ":~", snippet: ":~ ${1:body}. [${2:weight}@${3:level}]", meta: "weak" },
          ]);
        },
      };

      langTools.addCompleter(baseCompleter);

      const jsonCompleter = {
        identifierRegexps: [/[a-zA-Z0-9_#:-]/],
        getCompletions: (_ed: any, session: any, pos: any, prefix: any, cb: any) => {
          const textModel = session.getValue();

          // caso buffer vuoto → Ctrl+Space
          if (!prefix && textModel.trim().length === 0) {
            return cb(null, [
              ...getAspCompletions("#"),
              ...getAspCompletions("weak"),
              ...getAspCompletions("constraints"),
              { caption: "#int", snippet: "#int", meta: "keyword" },
              { caption: ":-", snippet: ":- ${1:body}.", meta: "constraint" },
              { caption: ":~", snippet: ":~ ${1:body}. [${2:weight}@${3:level}]", meta: "weak" },
            ]);
          }

          const trigger = getTrigger(session, pos);
          let result: any[] = [];

          switch (trigger) {
            case "#":
              result = getAspCompletions("#");
              break;
            case ";":
            case ",":
            case " ":
              result = [...getAspCompletions("weak"), ...getAspCompletions("constraints")];
              break;
            default:
              break;
          }

          cb(null, result);
        },
      };

      langTools.addCompleter(jsonCompleter);
    }
  };

  const inizializeAutoComplete = () => {
    inizializeSnippets();
  };

  const onChange = (value: string) => {
    inizializeAutoComplete();
    const last = value[value.length - 1];
    let runAuto = false;
    if (last === "." && props.runAuto) runAuto = true;
    if (props.onChange) props.onChange(props.tabKey, value, runAuto);
  };

  const onFocus = (e: any) => {
    window.dispatchEvent(new Event("resize"));
    if (props.onFocus) props.onFocus(props.tabKey, e);
  };

  return (
    <AceEditor
      ref={reactAce}
      height="100%"
      width="0px"
      mode="text"
      theme={props.darkTheme ? "idle_fingers" : "tomorrow"}
      name={`editor-${props.tabKey}`}
      value={props.value}
      fontSize={fontSize}
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        fontSize: 15,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        scrollPastEnd: true,
        cursorStyle: "smooth",
      }}
      onChange={onChange}
      onFocus={onFocus}
      style={{ flexGrow: 1 }}
    />
  );
});

LoideAceEditor.displayName = "LoideAceEditor";
export default LoideAceEditor;
