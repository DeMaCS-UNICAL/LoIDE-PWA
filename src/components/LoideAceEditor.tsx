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
import { ASP_AUTOCOMPLETE_DICT } from "../lib/ace/autocomplete-dicts";
// import { EditSession } from "ace-builds";
//
// EditSession.prototype.toJSON = function () {
//   return {
//     annotations: this.getAnnotations(),
//     breakpoints: this.getBreakpoints(),
//     folds: this.getAllFolds().map(function (fold: any) {
//       return fold.range;
//     }),
//     history: {
//       undo: this.getUndoManager().$undoStack,
//       redo: this.getUndoManager().$redoStack,
//     },
//     mode: this.getMode().$id,
//     scrollLeft: this.getScrollLeft(),
//     scrollTop: this.getScrollTop(),
//     selection: this.getSelection().toJSON(),
//     value: this.getValue(),
//   };
// };

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

  // effect to save and restore the editor session
  useEffect(() => {
    const edt = reactAce?.current;
    const editor = edt?.editor;

    if (edt && editor) {
      if (props.session) {
        const sessionToRestore = JSON.parse(props.session);

        const newSession = createEditSession(sessionToRestore);
        editor.setSession(newSession);
      }
    }

    return () => {
      if (edt && props.onSaveSession && editor) {
        const sessionToSave = JSON.stringify(editor.getSession());
        props.onSaveSession(props.tabKey, sessionToSave);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // set the forwardRef from AceEditor ref
  useEffect(() => {
    if (typeof forwardRef === "function" && reactAce) {
      forwardRef(reactAce.current);
    } else {
      (forwardRef as any).current = reactAce.current;
    }
  }, [reactAce, forwardRef]);

  // set the AceEditor mode
  useEffect(() => {
    const edt = reactAce?.current;
    if (edt) {
      const isInAndSupported = Object.values(LoideLanguages).find((lang) => {
        return lang.name === props.mode && lang.highlightSupport;
      });
      if (isInAndSupported) {
        edt.editor.getSession().setMode("ace/mode/" + props.mode);
        console.log("props.mode " + props.mode);
      } else {
        //edt.editor.getSession().setMode("ace/mode/text");
        edt.editor.getSession().setMode("ace/mode/asp");
        console.log(props.mode);
        console.log("props.mode " + "textttt");
      }
    }
  }, [props.mode]);

  const langTools = ace.require("ace/ext/language_tools");

  //const languageChosen = props.mode;
  const languageChosen = LoideLanguages.ASP.name;
  const solverChosen = LoideSolvers.DLV;
  //const solverChosen = props.solver;

  const onChange = (value: any) => {
    inizializeAutoComplete(value);
    const lastCharacter = value[value.length - 1];
    const edt = reactAce.current;
    let runAuto = false;
    switch (lastCharacter) {
      case "'":
        if (edt) {
          edt.editor.replaceAll('"', { needle: "'" });
          value = edt.editor.getValue();
        }
        break;

      case ".":
        if (props.runAuto) runAuto = true;
        break;

      default:
        break;
    }

    if (props.onChange) props.onChange(props.tabKey, value, runAuto);
  };

  const onFocus = (e: any) => {
    window.dispatchEvent(new Event("resize"));
    if (props.onFocus) props.onFocus(props.tabKey, e);
  };

  // --- helper per capire il trigger (#, &, ',', ' ') sulla riga corrente ---
  const getTriggerCharacter = (session: any, pos: any): string | undefined => {
    const line = session.getLine(pos.row);
    let characterIndex = pos.column - 1;
    const searchedCharacters = /[ (,a-zA-Z0-9_#&:-]/;

    let triggerCharacter: string | undefined = undefined;

    while (characterIndex >= 0 && searchedCharacters.test(line[characterIndex])) {
      if ([",", "(", "#", "&", " "].includes(line[characterIndex])) {
        triggerCharacter = line[characterIndex];
        break;
      }
      characterIndex--;
    }

    return triggerCharacter;
  };

  // --- helper per costruire le completion da ASP_AUTOCOMPLETE_DICT ---
  const getAspDictCompletions = (trigger: string | undefined) => {
    const completions: {
      caption: string;
      snippet: string;
      meta: string;
      docHTML?: string;
    }[] = [];

    if (trigger === "#") {
      const dict = ASP_AUTOCOMPLETE_DICT["#"] || {};
      Object.entries<any>(dict).forEach(([key, elem]) => {
        // key es: "#show"
        completions.push({
          caption: key,              // "#show" — così il prefix "#" combacia
          snippet: elem.snippet,     // "show ${1:p}/${2:n}" → risultato "#show p/n"
          meta: "directive / aggregate",
          docHTML: `<b>${elem.detail}</b><br/><pre>${elem.documentation}</pre>`,
        });
      });
    } else if (trigger === "&") {
      const dict = ASP_AUTOCOMPLETE_DICT["&"] || {};
      Object.entries<any>(dict).forEach(([key, elem]) => {
        // key es: "&abs"
        completions.push({
          caption: key,              // "&abs" — cosí il prefix "&" combacia
          snippet: elem.snippet,     // "abs(${1:X};${2:Z})" → risultato "&abs(X;Z)"
          meta: "external atom",
          docHTML: `<b>${elem.detail}</b><br/><pre>${elem.documentation}</pre>`,
        });
      });
    } else if (trigger === "," || trigger === " ") {
      // conversion types etc. da "language-constants"
      const consts = ASP_AUTOCOMPLETE_DICT["language-constants"] || [];
      consts.forEach((c: string) => {
        completions.push({
          caption: c,
          snippet: c,
          meta: "conversion type",
        });
      });
    }

    return completions;
  };

  const inizializeSnippets = () => {
    langTools.setCompleters([]); // reset completers.

    // completer che include snippets e alcune keyword
    let completer;

    switch (languageChosen) {
      case LoideLanguages.DATALOG.name:
        switch (solverChosen) {
          case LoideSolvers.IDLV:
            completer = {
              identifierRegexps: [/[a-zA-Z_0-9#&:$\-\u00A2-\uFFFF]/],
              getCompletions: function (
                editor: any,
                session: any,
                pos: any,
                prefix: any,
                callback: any,
              ) {
                const completions = [
                  {
                    caption: ":-",
                    snippet: ":- ${1:literals}.",
                    meta: "body/constraint",
                  },
                ];
                callback(null, completions);
              },
            };
            langTools.addCompleter(completer);
            break;
        }
        break;
      case LoideLanguages.ASP.name:
        switch (solverChosen) {
          case LoideSolvers.DLV:
            // completer ORIGINALE (lasciato intatto, solo regex ampliata con &)
            completer = {
              identifierRegexps: [/[a-zA-Z_0-9#&:$\-\u00A2-\uFFFF]/],
              getCompletions: function (
                editor: any,
                session: any,
                pos: any,
                prefix: any,
                callback: any,
              ) {
                const completions = [
                  {
                    caption: "#const",
                    snippet: "#const ${1:namedConstant} = ${2:costant}",
                    meta: "keyword",
                  },
                  {
                    caption: "#maxint",
                    snippet: "#maxint = ${1:Number}",
                    meta: "keyword",
                  },
                  {
                    caption: "#append",
                    snippet: "#append(${1:X}, ${2:Y}, ${3:Z})",
                    meta: "list predicate",
                  },
                  {
                    caption: "#delnth",
                    snippet: "#delnth(${1:X}, ${2:Y}, ${3:Z})",
                    meta: "list predicate",
                  },
                  {
                    caption: "#flatten",
                    snippet: "#flatten(${1:X}, ${2:Y}, ${3:Z})",
                    meta: "list predicate",
                  },
                  {
                    caption: "#head",
                    snippet: "#head(${1:X}, ${2:Y}, ${3:Z})",
                    meta: "list predicate",
                  },
                  {
                    caption: "#insLast",
                    snippet: "#insLast(${1:X}, ${2:Y}, ${3:Z})",
                    meta: "list predicate",
                  },
                  {
                    caption: "#insnth",
                    snippet: "#insnth(${1:X}, ${2:Y}, ${3:Z}, ${4:W})",
                    meta: "list predicate",
                  },
                  {
                    caption: "#last",
                    snippet: "#last(${1:X}, ${2:Y})",
                    meta: "list predicate",
                  },
                  {
                    caption: "#length",
                    snippet: "#length(${1:X}, ${2:Y})",
                    meta: "list predicate",
                  },
                  {
                    caption: "#member",
                    snippet: "#member(${1:X}, ${2:Y})",
                    meta: "list predicate",
                  },
                  {
                    caption: "#reverse",
                    snippet: "#reverse(${1:X}, ${2:Y})",
                    meta: "list predicate",
                  },
                  {
                    caption: "#subList",
                    snippet: "#subList(${1:X}, ${2:Y})",
                    meta: "list predicate",
                  },
                  {
                    caption: "#tail",
                    snippet: "#tail(${1:X}, ${2:Y})",
                    meta: "list predicate",
                  },
                  {
                    caption: "#getnth",
                    snippet: "#getnth(${1:X}, ${2:Y}, ${3:Z})",
                    meta: "list predicate",
                  },

                  // -------
                  {
                    caption: "+",
                    snippet: "+(${1:Var1}, ${2:Var2}, ${3:Var3})",
                    meta: "arithmetic predicates",
                  },
                  {
                    caption: "-",
                    snippet: "-(${1:Var1}, ${2:Var2}, ${3:Var3})",
                    meta: "arithmetic predicates",
                  },
                  {
                    caption: "*",
                    snippet: "*(${1:Var1}, ${2:Var2}, ${3:Var3})",
                    meta: "arithmetic predicates",
                  },
                  {
                    caption: "/",
                    snippet: "/(${1:Var1}, ${2:Var2}, ${3:Var3})",
                    meta: "arithmetic predicates",
                  },
                  // {
                  //     caption: "#int(X)",
                  //     snippet: "#int(${1:Var})",
                  //     meta: "arithmetic predicates"
                  // },
                  {
                    caption: "#int",
                    snippet: "#int(${1:Var1}, ${2:Var2}, ${3:Var3})",
                    meta: "arithmetic predicates",
                  },
                  {
                    caption: "#suc",
                    snippet: "#suc(${1:Var1}, ${2:Var2})",
                    meta: "arithmetic predicates",
                  },
                  {
                    caption: "#pred",
                    snippet: "#pred(${1:Var1}, ${2:Var2})",
                    meta: "arithmetic predicates",
                  },
                  {
                    caption: "#mod",
                    snippet: "#mod(${1:Var1}, ${2:Var2}, ${3:Var3})",
                    meta: "arithmetic predicates",
                  },
                  {
                    caption: "#absdiff",
                    snippet: "#absdiff(${1:Var1}, ${2:Var2}, ${3:Var3})",
                    meta: "arithmetic predicates",
                  },
                  {
                    caption: "#rand",
                    snippet: "#rand(${1:Var1}, ${2:Var2}, ${3:Var3})",
                    meta: "arithmetic predicates",
                  },
                  // {
                  //     caption: "#rand(X)",
                  //     snippet: "#rand(${1:Var})",
                  //     meta: "arithmetic predicates"
                  // },
                  {
                    caption: "#times",
                    snippet: "#times{${1:Vars} : ${2:Congj}}",
                    meta: "aggregate function",
                  },
                  {
                    caption: "#sum",
                    snippet: "#sum{${1:Vars} : ${2:Congj}}",
                    meta: "aggregate function",
                  },
                  {
                    caption: "#min",
                    snippet: "#min{${1:Vars} : ${2:Congj}}",
                    meta: "aggregate function",
                  },
                  {
                    caption: "#max",
                    snippet: "#max{${1:Vars} : ${2:Congj}}",
                    meta: "aggregate function",
                  },
                  {
                    caption: "#count",
                    snippet: "#count{${1:Vars} : ${2:Congj}}",
                    meta: "aggregate function",
                  },
                  {
                    caption: ":~",
                    snippet: ":~ ${1:literals}. [${2:conditions}]",
                    meta: "weak constraint",
                  },
                  {
                    caption: ":-",
                    snippet: ":- ${1:literals}.",
                    meta: "body/constraint",
                  },
                ];
                callback(null, completions);
              },
            };
            langTools.addCompleter(completer);

            // nuovo completer che usa aggregates.json, builtins.json, constants.json
            const aspDictCompleter = {
              identifierRegexps: [/[a-zA-Z_0-9#&:$\-\u00A2-\uFFFF]/],
              getCompletions: (
                editor: any,
                session: any,
                pos: any,
                prefix: any,
                callback: any,
              ) => {
                const trigger = getTriggerCharacter(session, pos);
                const completions = getAspDictCompletions(trigger);
                callback(null, completions);
              },
            };
            langTools.addCompleter(aspDictCompleter);
            break;

          case LoideSolvers.DLV2:
            completer = {
              identifierRegexps: [/[a-zA-Z_0-9#&:$\-\u00A2-\uFFFF]/],
              getCompletions: function (
                editor: any,
                session: any,
                pos: any,
                prefix: any,
                callback: (
                  arg0: null,
                  arg1: {
                    caption: string;
                    snippet: string;
                    meta: string;
                  }[],
                ) => void,
              ) {
                const completions = [
                  {
                    caption: "#int",
                    snippet: "#int",
                    meta: "keyword",
                  },
                  {
                    caption: "#times",
                    snippet: "#times{${1:Vars} : ${2:Congj}}",
                    meta: "aggregate function",
                  },
                  {
                    caption: "#sum",
                    snippet: "#sum{${1:Vars} : ${2:Congj}}",
                    meta: "aggregate function",
                  },
                  {
                    caption: "#min",
                    snippet: "#min{${1:Vars} : ${2:Congj}}",
                    meta: "aggregate function",
                  },
                  {
                    caption: "#max",
                    snippet: "#max{${1:Vars} : ${2:Congj}}",
                    meta: "aggregate function",
                  },
                  {
                    caption: "#count",
                    snippet: "#count{${1:Vars} : ${2:Congj}}",
                    meta: "aggregate function",
                  },
                  {
                    caption: ":~",
                    snippet: ":~ ${1:literals}. [${2:conditions}]",
                    meta: "weak constraint",
                  },
                  {
                    caption: ":-",
                    snippet: ":- ${1:literals}.",
                    meta: "body/constraint",
                  },
                ];
                callback(null, completions);
              },
            };
            langTools.addCompleter(completer);
            break;
          case LoideSolvers.Clingo:
            completer = {
              identifierRegexps: [/[a-zA-Z_0-9#&:$\-\u00A2-\uFFFF]/],
              getCompletions: function (
                editor: any,
                session: any,
                pos: any,
                prefix: any,
                callback: any,
              ) {
                const completions = [
                  {
                    caption: ":~",
                    snippet: ":~ ${1:literals}. [${2:conditions}]",
                    meta: "weak constraint",
                  },
                  {
                    caption: ":-",
                    snippet: ":- ${1:literals}.",
                    meta: "body/constraint",
                  },
                ];
                callback(null, completions);
              },
            };
            langTools.addCompleter(completer);
            break;
        }
        break;

      default:
        break;
    }
  };

  const inizializeAutoComplete = (editorText: string) => {
    inizializeSnippets();

    switch (languageChosen) {
      case LoideLanguages.ASP.name:
      case LoideLanguages.DATALOG.name: {
        const splitRegex = /([a-zA-Z_]\w*)(\(.+?\))/gi;
        const words = editorText.match(splitRegex);
        if (words != null) {
          const map = new Map();
          words.forEach(function (word: string) {
            const nameMatches = word.match(/[^_]([a-zA-Z_]\w*)/);
            const aritiesMathces = word.match(/\(.+?\)/);
            if (nameMatches && aritiesMathces) {
              const name = nameMatches[0];
              const arities = aritiesMathces[0].split(",").length;
              map.set(name, arities);
            }
          });
          const completions: {
            caption: any;
            snippet: string;
            meta: string;
          }[] = [];
          map.forEach(function (key, value) {
            completions.push({
              caption: value,
              snippet: value + giveBrackets(key),
              meta: "atom",
            });
          });

          const completer = {
            getCompletions: function (
              editor: any,
              session: any,
              pos: any,
              prefix: any,
              callback: (arg0: null, arg1: any[]) => void,
            ) {
              callback(null, completions);
            },
          };

          langTools.addCompleter(completer);
        }
        break;
      }
      default:
        break;
    }
  };

  const giveBrackets = (value: number) => {
    let par = "(";
    let LETTER = "A";
    let limit = 0;
    if (value <= 26) limit = value;
    else limit = 26;
    for (let i = 0; i < limit; i++) {
      const num = i + 1;
      par += "${" + num + ":" + LETTER + "}";
      if (i !== limit - 1) {
        par += ",";
      }
      LETTER = String.fromCharCode(LETTER.charCodeAt(0) + 1);
    }
    par += ")";
    return par;
  };

  return (
    <AceEditor
      ref={reactAce}
      height="100%"
      width="0px"
      // mode={props.mode}
      mode="text"
      theme={props.darkTheme ? "idle_fingers" : "tomorrow"}
      name={`editor-${props.tabKey}`}
      value={props.value}
      fontSize={fontSize}
      editorProps={{
        $blockScrolling: true,
      }}
      setOptions={{
        fontSize: 15,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        cursorStyle: "smooth",
        copyWithEmptySelection: true,
        scrollPastEnd: true,
      }}
      onChange={onChange}
      onFocus={onFocus}
      style={{ flexGrow: 1 }}
    />
  );
});

LoideAceEditor.displayName = "LoideAceEditor";

export default LoideAceEditor;
