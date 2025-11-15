import { define } from "ace-builds/src-noconflict/ace";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
define("ace/mode/datalog", [], function (require, exports, module) {
  var oop = require("ace/lib/oop");
  var TextMode = require("ace/mode/text").Mode;
  var datalogHighlightRules = require("ace/mode/datalog_highlight_rules").datalogHighlightRules;

  var Mode = function () {
    this.HighlightRules = datalogHighlightRules;
    this.$id = "ace/mode/datalog"; // 🔹 aggiunto: aiuta Ace a riconoscere il mode
  };
  oop.inherits(Mode, TextMode);

  (function () {
    this.lineCommentStart = "%";
  }).call(Mode.prototype);

  exports.Mode = Mode;
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
define("ace/mode/datalog_highlight_rules", [], function (require, exports, module) {
  var oop = require("ace/lib/oop");
  var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

  var datalogHighlightRules = function () {
    // 🔹 come prima: "not" è support/keyword
    var support = "not";
    var keywordMapper = this.createKeywordMapper(
      {
        "constant.language": support, // puoi in futuro cambiarlo in "keyword.control"
      },
      "identifier",
      true,
    );

    this.$rules = {
      start: [
        // --------------------
        // COMMENTI (mantenuto, ma reso più robusto)
        // --------------------
        {
          token: "comment",
          regex: "%.*$", // prima era "%.+", così prende anche riga con solo "%"
        },

        // --------------------
        // STRINGHE (aggiunte, non c'erano prima)
        // --------------------
        {
          token: "string", // puoi differenziare in single/double se vuoi
          regex: "'(?:[^'\\\\]|\\\\.)*'",
        },
        {
          token: "string",
          regex: '"(?:[^"\\\\]|\\\\.)*"',
        },

        // --------------------
        // NUMERI (esteso: ora anche decimali)
        // --------------------
        {
          token: "constant.numeric",
          regex: "\\b\\d+(?:\\.\\d+)?\\b", // prima era solo "[0-9]+"
        },

        // --------------------
        // VARIABILI (NUOVO ma non rompe nulla)
        //   Classico stile Datalog: iniziano con maiuscola o _
        // --------------------
        {
          token: "variable.datalog",
          regex: "\\b[_A-Z][A-Za-z0-9_]*\\b",
        },

        // --------------------
        // PARENTESI COME PRIMA → attiva gli stati blocktag/...
        // (NON rimosso, solo spostato un po' più giù)
        // --------------------
        {
          token: "keyword",
          regex: "[\\(]+",
          next: "blocktag",
        },

        // --------------------
        // PARTE: parole chiave / identificatori (come prima, ma più chiaro)
        // --------------------
        {
          token: keywordMapper,
          regex: "[a-z]+",
        },

        // --------------------
        // OPERATORI (mantenuti, solo riscritti in modo leggibile)
        // --------------------
        {
          token: "keyword.operator",
          regex: "\\-|\\+|\\*|\\/|\\<|\\<=|\\>|\\>=|\\=|\\!=",
        },

        // --------------------
        // OPERATORI DI REGOLA (mantenuti)
        // --------------------
        {
          token: "keyword",
          regex: ":-|:~",
        },

        // --------------------
        // SPAZI BIANCHI (BUGFIX)
        // prima: "s+" → era un typo
        // --------------------
        {
          token: "text",
          regex: "\\s+",
        },
      ],

      // ==========================
      // Stati secondari (NON tolgo nulla)
      // ==========================

      blocktag: [
        {
          token: "string",
          regex: '[A-Za-z0-9_"][a-zA-Z0-9_"]*',
          next: "blocknext",
        },
        {
          token: "keyword",
          regex: "\\(",
        },
      ],

      blocktagproperties: [
        {
          token: "string",
          regex: "[A-Za-z0-9_][a-zA-Z0-9_]*",
          next: "blocknext",
        },
        {
          token: "keyword",
          regex: "[\\)]*",
          next: "start",
        },
      ],

      blocknext: [
        {
          token: "text",
          regex: "\\s*[,|.]*\\s*",
          next: "blocktagproperties",
        },
      ],
    };

    this.normalizeRules();
  };

  oop.inherits(datalogHighlightRules, TextHighlightRules);

  exports.datalogHighlightRules = datalogHighlightRules;
});
