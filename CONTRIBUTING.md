\# Contributing: Examples in the Editor



This document describes the contribution \*\*“Examples in the editor”\*\*, submitted as a Pull Request to \*\*LoIDE-PWA\*\*.  

It explains the motivation, the implementation details, the modified files, and how to use and extend the new feature.



This contribution originates from the \*\*wishlist described in the draft version of the LoIDE paper\*\*, where the corresponding item is explicitly titled \*\*“Examples in the editor”\*\*.



---



\## 1. Contribution Context



\- \*\*Repository\*\*: LoIDE-PWA  

\- \*\*Contribution type\*\*: Feature  

\- \*\*Development model\*\*: Fork-based  

\- \*\*Base branch\*\*: `LoIDE-PWA/develop`  

\- \*\*Feature branch\*\*: `examples-in-the-editor`  

\- \*\*Commits\*\*: single atomic commit  

&nbsp; ```

&nbsp; examples in the editor

&nbsp; ```



The contribution is intentionally kept atomic to simplify review and ensure clear traceability with the paper wishlist.



---



\## 2. Feature Overview



The goal of this contribution is to:



\- make example programs directly accessible inside the editor UI,

\- avoid hardcoded examples in UI components,

\- support easy extension by adding new example files,

\- keep the feature lightweight and aligned with research-oriented development.



The feature introduces an \*\*Examples Explorer\*\* modal that allows users to:

\- browse available examples,

\- preview their content and metadata,

\- load an example directly into the editor.



---



\## 3. High-Level Design



The design of the feature is based on the following principles:



1\. \*\*Examples as data\*\*  

&nbsp;  Example programs are defined as structured JSON files, independent of the UI.



2\. \*\*Automatic discovery\*\*  

&nbsp;  All example files are automatically loaded at build time using Vite.



3\. \*\*UI as consumer\*\*  

&nbsp;  UI components consume preloaded example data and do not embed loading or parsing logic.



---



\## 4. Modified and Added Files



This contribution introduces new files and modifies existing ones to implement the \*“Examples in the editor”\* feature.  

The changes are organized to keep example data, loading logic, and UI concerns clearly separated.



\### Added files



\- \*\*`src/examples/\*.json`\*\*  

&nbsp; New JSON files defining built-in example programs.  

&nbsp; Each file represents a single example and follows a structured schema including metadata and source code.



\- \*\*`src/lib/examples.ts`\*\*  

&nbsp; Introduces typed example loading logic.  

&nbsp; This file defines the example interfaces, automatically imports all example JSON files using `import.meta.glob`, and exposes a unified list of examples to the UI.



\- \*\*`src/modals/ExampleExplorerModal.tsx`\*\*  

&nbsp; Implements the \*Examples Explorer\* modal.  

&nbsp; This component lists available examples, previews their content, displays optional solver hints, and allows loading an example into the editor.



\### Modified files



\- \*\*`src/pages/MainTab.tsx`\*\*  

&nbsp; Integrates the Examples Explorer into the main application flow.  

&nbsp; This file handles opening the modal and injecting the selected example code into the editor.



---



\## 5. Example File Format



Each example program is defined by a single JSON file located in `src/examples/`.



\### JSON schema



```json

{

&nbsp; "id": "choice-and-constraint",

&nbsp; "title": "Choice and constraint",

&nbsp; "description": "Toy example that chooses a menu with exactly one main course and one drink.",

&nbsp; "language": "asp",

&nbsp; "code": "...",

&nbsp; "suggested\_solver": "clingo,dlv"

}

```



\### Field semantics



\- \*\*`id`\*\*: unique identifier for the example  

\- \*\*`title`\*\*: human-readable name displayed in the UI  

\- \*\*`description`\*\*: short explanation shown in the preview  

\- \*\*`language`\*\*: programming language identifier (e.g. `asp`)  

\- \*\*`code`\*\*: full source code of the example  

\- \*\*`suggested\_solver`\*\* (optional): comma-separated list used only as a UI hint



---



\## 6. How to Add a New Example



To add a new built-in example:



1\. Create a new JSON file in:

&nbsp;  ```

&nbsp;  src/examples/<example-id>.json

&nbsp;  ```



2\. Fill in all required fields according to the schema described above.



3\. No additional changes are required:

&nbsp;  - examples are automatically imported,

&nbsp;  - they appear in the Examples Explorer,

&nbsp;  - they can be loaded into the editor.



Manual imports or UI changes are not necessary.



---



\## 7. Design Decisions



\- \*\*JSON-based examples\*\*  

&nbsp; Chosen to keep examples readable, editable, and suitable for research and teaching.



\- \*\*Automatic loading via Vite\*\*  

&nbsp; Simplifies extension and avoids error-prone manual imports.



\- \*\*Single atomic commit\*\*  

&nbsp; Facilitates code review and maintains a clear link to the paper wishlist item.



---



\## 8. Scope and Limitations



\- This contribution does not introduce persistence or user-defined examples.

\- Only curated, built-in examples are supported.

\- Solver information is informational only and does not affect execution.



---



\## 9. Summary



This contribution introduces an extensible and lightweight \*\*Examples Explorer\*\* for LoIDE-PWA, directly aligned with the \*“Examples in the editor”\* wishlist item of the LoIDE paper draft, improving usability while preserving architectural simplicity.



