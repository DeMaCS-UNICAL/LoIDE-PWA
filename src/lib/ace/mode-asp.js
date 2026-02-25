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
    // 🔹 all built-in &... obtained from completions JSON
    var builtinList =
      "head|tail|append|delNth|flatten|insLast|insNth|last|" +
      "length|member|memberNth|subList|reverse|reverse_r|delete|delete_r|" +
      "abs|int|mod|rand|sum|append_str|length_str|member_str|" +
      "reverse_str|sub_str|to_qstr";

    this.$rules = {
      start: [
        //
        // --- TESTING block: %** ... **%
        //
        {
          token: "testing.block.asp",
          regex: "\\s*%\\*\\*",
          push: "testing_block",
        },

        //
        // --- Multiline comment: %/ ... /%
        //
        {
          token: "comment.block.asp",
          regex: "\\s*%/",
          push: "comment_block",
        },

        //
        // --- Inline line comment: % ... (until EOL)
        //
        {
          token: "comment.line.asp",
          regex: "%.*$",
        },

        //
        // --- Single quoted strings: '...'
        //
        {
          token: "string.quoted.single.asp",
          regex: "'(?:[^'\\\\]|\\\\.)*'",
        },

        //
        // --- Double quoted strings: "..."
        //
        {
          token: "string.quoted.double.asp",
          regex: '"(?:[^"\\\\]|\\\\.)*"',
        },

        //
        // --- Variables (starting with uppercase)
        //
        {
          token: "variable.asp",
          regex: "\\b[A-Z][A-Za-z0-9_]*\\b",
        },

        //
        // --- Strong rule operator: :-
        //
        {
          token: "keyword.operator.strong.asp",
          regex: ":-",
        },

        //
        // --- Weak constraint prefix: a:~
        //
        {
          token: "keyword.operator.weak.asp",
          regex: "[a-zA-Z0-9]+:\\~\\s*",
        },

        //
        // --- Weak cost: [10@1,foo,bar]
        //
        {
          token: "constant.other.weak_cost.asp",
          regex: "\\[\\d+@\\d+,\\w+,\\w+\\]",
        },

        //
        // --- Operators / keywords: not, !=, >=, <=, |, =, etc.
        //
        {
          token: "keyword.control.asp",
          regex: "\\bnot\\b|\\|{1,2}|!=|>=|<=|=|>|<|,|\\.",
        },

        //
        // --- Numeric literals (simplified)
        //
        {
          token: "constant.numeric.asp",
          regex: "\\b\\d+(?:\\.\\d+)?\\b",
        },

        //
        // --- Aggregates: #count, #sum, #times, #min, #max
        //
        {
          token: "support.function.aggregate.asp",
          regex: "#(count|sum|times|min|max)\\b",
        },

        //
        // --- Directives (matching completions / SQL / triggers / consts)
        //
        {
          token: "keyword.directive.asp",
          regex:
            "#(show|import_sql|export_sql|import_local_sparql|import_remote_sparql|" +
            "external_predicate_conversion|temp|trigger_frequency|" +
            "const|maxint)\\b",
        },

        //
        // --- List predicates (matching completions JSON)
        //
        {
          token: "support.function.list.asp",
          regex:
            "#(append|delNth|flatten|head|insLast|insNth|last|" +
            "length|member|reverse|subList|tail|getnth)\\b",
        },

        //
        // --- Arithmetic helpers: #int, #mod, #rand, #pred, #suc, etc.
        //
        {
          token: "support.function.arithmetic.asp",
          regex: "#(int|suc|pred|mod|absdiff|rand)\\b",
        },

        //
        // --- Built-in external predicates: &head, &append_str, etc.
        //
        {
          token: "support.function.builtin.asp",
          regex: "&(?:" + builtinList + ")\\b",
        },

        //
        // --- Generic external predicate: &foo
        //
        {
          token: "support.function.external.asp",
          regex: "&[A-Za-z0-9_]+",
        },

        //
        // --- Generic identifier (predicate, constant, etc.)
        //
        {
          token: "identifier.asp",
          regex: "[a-z_][A-Za-z0-9_]*\\b",
        },
      ],

      //
      // State: multiline comment: %/ ... /%
      //
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

      //
      // State: TESTING block %** ... **%
      //
      testing_block: [
        {
          token: "testing.block.asp",
          regex: "\\*\\*%",
          next: "pop",
        },
        {
          defaultToken: "testing.block.asp",
        },
      ],
    };

    this.normalizeRules();
  };

  oop.inherits(aspHighlightRules, TextHighlightRules);

  exports.aspHighlightRules = aspHighlightRules;
});
