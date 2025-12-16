import { define } from "ace-builds/src-noconflict/ace";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
define("ace/mode/asp", [], function (require, exports, module) {
  var oop = require("ace/lib/oop");
  var TextMode = require("ace/mode/text").Mode;
  var aspHighlightRules = require("ace/mode/asp_highlight_rules").aspHighlightRules;

  var Mode = function () {
    this.HighlightRules = aspHighlightRules;
    this.$id = "ace/mode/asp";
  };
  oop.inherits(Mode, TextMode);

  (function () {
    this.lineCommentStart = "%";
  }).call(Mode.prototype);

  exports.Mode = Mode;
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
define("ace/mode/asp_highlight_rules", [], function (require, exports, module) {
  var oop = require("ace/lib/oop");
  var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

  var aspHighlightRules = function () {
    // 🔹 tutti i built-in &... che hai nel JSON
    var builtinList =
      "head|tail|append|delNth|flatten|insLast|insNth|last|" +
      "length|member|memberNth|subList|reverse|reverse_r|delete|delete_r|" +
      "abs|int|mod|rand|sum|append_str|length_str|member_str|" +
      "reverse_str|sub_str|to_qstr";

    this.$rules = {
      start: [
        // --- TESTING block: %** ... **%
        {
          token: "testing.block.asp",
          regex: "\\s*%\\*\\*",
          push: "testing_block",
        },

        // --- Commento multilinea: %/ ... /%
        {
          token: "comment.block.asp",
          regex: "\\s*%/",
          push: "comment_block",
        },

        // --- Commento inline: % ... (fino a fine riga)
        {
          token: "comment.line.asp",
          regex: "%.*$",
        },

        // --- Stringhe singole: '...'
        {
          token: "string.quoted.single.asp",
          regex: "'(?:[^'\\\\]|\\\\.)*'",
        },

        // --- Stringhe doppie: "..."
        {
          token: "string.quoted.double.asp",
          regex: '"(?:[^"\\\\]|\\\\.)*"',
        },

        // --- Variabili (iniziano con maiuscola)
        {
          token: "variable.asp",
          regex: "\\b[A-Z][A-Za-z0-9_]*\\b",
        },

        // --- Strong: :-
        {
          token: "keyword.operator.strong.asp",
          regex: ":-",
        },

        // --- Weak: a:~ ...
        {
          token: "keyword.operator.weak.asp",
          regex: "[a-zA-Z0-9]+:\\~\\s*",
        },

        // --- Weak cost: [10@1,foo,bar]
        {
          token: "constant.other.weak_cost.asp",
          regex: "\\[\\d+@\\d+,\\w+,\\w+\\]",
        },

        // --- Operator / keyword: not, |, !=, >, <, =, >=, <=, , .
        {
          token: "keyword.control.asp",
          regex: "\\bnot\\b|\\|{1,2}|!=|>=|<=|=|>|<|,|\\.",
        },

        // --- Numeri (semplificati)
        {
          token: "constant.numeric.asp",
          regex: "\\b\\d+(?:\\.\\d+)?\\b",
        },

        // --- Aggregates: #count, #sum, #times, #min, #max
        {
          token: "support.function.aggregate.asp",
          regex: "#(count|sum|times|min|max)\\b",
        },

        // --- Direttive (JSON + completions TSX): #show, #import_sql, #temp, #trigger_frequency, #const, #maxint, ...
        {
          token: "keyword.directive.asp",
          regex:
            "#(show|import_sql|export_sql|import_local_sparql|import_remote_sparql|" +
            "external_predicate_conversion|temp|trigger_frequency|" +
            "const|maxint)\\b",
        },

        // --- Predicati su liste (da completions TSX): #append, #delnth, #flatten, #head, ...
        {
          token: "support.function.list.asp",
          regex:
            "#(append|delnth|flatten|head|insLast|insnth|last|" +
            "length|member|reverse|subList|tail|getnth)\\b",
        },

        // --- Funzioni aritmetiche: #int, #suc, #pred, #mod, #absdiff, #rand
        {
          token: "support.function.arithmetic.asp",
          regex: "#(int|suc|pred|mod|absdiff|rand)\\b",
        },

        // --- Aggregates stile #count { ... } già coperti sopra, quindi qui nulla

        // --- Aggregates "Clingo-style" con #: li puoi aggiungere qui se servono altri

        // --- Aggregates/costruzioni generiche già coperti

        // --- Aggregates con #: lasciamo solo i noti per evitare highlight a casaccio

        // --- Aggregates: #count, #sum, #times, #min, #max (ripetuti per sicurezza, ma già gestiti)

        // --- Builtins: &head, &tail, &append, &delNth, ..., &append_str, ...
        {
          token: "support.function.builtin.asp",
          regex: "&(?:" + builtinList + ")\\b",
        },

        // --- External predicates generici: &foo
        {
          token: "support.function.external.asp",
          regex: "&[A-Za-z0-9_]+",
        },

        // --- Identificatori generici (predicati, costanti, ecc.)
        {
          token: "identifier.asp",
          regex: "[a-z_][A-Za-z0-9_]*\\b",
        },
      ],

      // Stato: commento multilinea %/ ... /%
      comment_block: [
        {
          token: "comment.block.asp",
          regex: "/%",
          next: "pop",
        },
        {
          defaultToken: "comment.block.asp",
        },
      ],

      
    };

    this.normalizeRules();
  };

  oop.inherits(aspHighlightRules, TextHighlightRules);

  exports.aspHighlightRules = aspHighlightRules;
});
