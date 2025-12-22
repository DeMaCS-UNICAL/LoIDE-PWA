\# Contributing: Improved ASP Syntax Highlighting



This document describes the contribution \*\*“Improved ASP syntax highlighting”\*\*, submitted as a Pull Request to \*\*LoIDE-PWA\*\*.

It explains the motivation, the implementation details, the modified file, and the effects of the enhancement.



Unlike other recent contributions, this change \*\*does not originate from a specific item in the wishlist of the LoIDE paper draft\*\*.

It is instead a \*\*design-driven and usability-oriented improvement\*\*, aimed at significantly enhancing the readability and expressiveness of ASP programs inside the editor.



---



\## 1. Contribution Context



\- \*\*Repository\*\*: LoIDE-PWA  

\- \*\*Contribution type\*\*: Enhancement / Refactoring  

\- \*\*Development model\*\*: Fork-based  

\- \*\*Base branch\*\*: `LoIDE-PWA/develop`  

\- \*\*Feature branch\*\*: `syntax-highlighting-enhancement`

\- \*\*Commits\*\*: single atomic commit  



This contribution focuses exclusively on improving the ASP syntax highlighting layer.



---



\## 2. Motivation



The previous ASP syntax highlighting was minimal and incomplete, covering only a small subset of ASP constructs.

In particular, it lacked proper support for:



\- multi-line comments,

\- strings (single and double quoted),

\- variables,

\- weak constraints and costs,

\- aggregates and directives,

\- built-in and external predicates,

\- modern Clingo-style constructs.



The goal of this contribution is to provide a \*\*more expressive, accurate, and modern syntax highlighting\*\* for ASP, aligned with the language features commonly used in LoIDE.



---



\## 3. High-Level Design



The enhancement is implemented entirely within the Ace Editor highlighting rules and follows these principles:



\- \*\*No changes to editor logic or UI components\*\*

\- \*\*Backward compatibility with existing ASP programs\*\*

\- \*\*Clear token classification\*\* for different ASP constructs

\- \*\*Extensibility\*\*, allowing future additions without structural changes



---



\## 4. Modified File



\### Modified file



\- \*\*`src/lib/ace/mode-asp.js`\*\*



This file has been entirely revised to provide a richer and more precise set of highlighting rules.



No other files were added or modified.



---



\## 5. Summary of Changes



The new syntax highlighting introduces support for:



\- inline comments (`% ...`)

\- multi-line comments (`%/ ... /%`)

\- testing blocks (`%\*\* ... \*\*%`)

\- single and double quoted strings

\- variables (capitalized identifiers)

\- strong constraints (`:-`)

\- weak constraints and weak costs

\- numeric constants

\- logical and comparison operators

\- aggregates (`#count`, `#sum`, `#min`, `#max`, ...)

\- directives (`#show`, `#const`, `#maxint`, ...)

\- list predicates and arithmetic functions

\- built-in predicates (`\&head`, `\&tail`, `\&append`, ...)

\- external predicates (`\&predicate`)

\- generic identifiers



Each construct is mapped to a dedicated Ace token category to improve readability and semantic distinction.



---



\## 6. Scope and Limitations



\- This contribution affects \*\*only syntax highlighting\*\*.

\- No semantic checks or parsing logic are introduced.

\- No changes are made to solver execution or program evaluation.

\- Highlighting accuracy depends on regular-expression-based rules, as per Ace Editor design.



---



\## 7. Design Rationale



This improvement was introduced proactively to:



\- improve user experience when writing ASP programs,

\- reduce cognitive load when reading complex encodings,

\- better reflect the expressive power of modern ASP dialects,

\- prepare the editor for future language-oriented extensions.



---



\## 8. Summary



This contribution significantly improves the ASP editing experience in LoIDE-PWA by providing a richer, more accurate, and extensible syntax highlighting system, while remaining fully isolated from editor logic and UI behavior.



