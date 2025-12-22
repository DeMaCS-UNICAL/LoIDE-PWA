\# Contributing: Output Panel Modularization and Layout Refactor



This document describes the contribution \*\*“Output panel modularization and layout refactor”\*\*, submitted as a Pull Request to \*\*LoIDE-PWA\*\*.

It explains the motivation, the implementation details, the modified files, and the resulting changes to the navigation and layout of the Progressive Web App.



This contribution originates from the \*\*wishlist described in the draft version of the LoIDE paper\*\*, where the corresponding item is titled \*\*“Output on the side”\*\*.



---



\## 1. Contribution Context



\- \*\*Repository\*\*: LoIDE-PWA  

\- \*\*Contribution type\*\*: UI / Layout enhancement  

\- \*\*Paper reference\*\*: wishlist item “Output on the side”  

\- \*\*Development model\*\*: Fork-based  

\- \*\*Base branch\*\*: `LoIDE-PWA/develop`  

\- \*\*Feature branch\*\*: `output-on-the-side`

\- \*\*Commits\*\*: single atomic commit  



This change is intentionally scoped to UI layout and component modularization.



---



\## 2. Motivation



This contribution addresses the \*\*“Output on the side”\*\* wishlist item described in the draft version of the LoIDE paper, aiming to improve the desktop navigation flow and overall usability of the editor.



In the previous implementation, the Output view was treated as a \*\*separate screen\*\* that users had to navigate to.

This approach had several drawbacks, especially on desktop devices:



\- frequent context switching between editor and output,

\- limited simultaneous visibility of code and results,

\- reduced usability for iterative development workflows.



The goal of this contribution is to:



\- keep the editor and output visible at the same time on desktop,

\- improve navigation flow and spatial consistency,

\- modularize the Output logic for better maintainability.



---



\## 3. High-Level Design



The refactor is based on the following design decisions:



1\. \*\*Output as a side panel on desktop\*\*  

&nbsp;  On large screens, the Output is displayed as a right-side panel next to the editor.



2\. \*\*Preserved mobile behavior\*\*  

&nbsp;  The Output panel is hidden on small and medium devices, preserving the existing mobile-oriented layout.



3\. \*\*Component modularization\*\*  

&nbsp;  Output-related logic is extracted into a dedicated, reusable component.



---



\## 4. Modified and Added Files



\### Added files



\- \*\*`src/components/OutputPane.tsx`\*\*  

&nbsp; New component responsible for rendering the Output panel.

&nbsp; It encapsulates:

&nbsp; - output rendering,

&nbsp; - toolbar actions (download, clear),

&nbsp; - interaction with Redux state.



\### Modified files



\- \*\*`src/pages/MainTab.tsx`\*\*  

&nbsp; Updated to include the new `OutputPane` component as a \*\*side panel\*\* using Ionic grid layout.

&nbsp; The file now orchestrates the editor and output panes without embedding output-specific logic.



No other files were modified.



---



\## 5. OutputPane Component



The `OutputPane` component:



\- consumes output state from Redux,

\- disables actions when no output is present,

\- provides download and clear actions,

\- renders the existing `Output` component internally.



All output-related UI logic is now isolated from page-level layout concerns.



---



\## 6. Layout Behavior



\- \*\*Desktop (large screens)\*\*  

&nbsp; - Editor on the left  

&nbsp; - Output panel on the right  

&nbsp; - Both visible simultaneously  



\- \*\*Mobile / Tablet\*\*  

&nbsp; - Output panel hidden  

&nbsp; - Existing navigation flow preserved  



This behavior is implemented using Ionic responsive grid utilities.



---



\## 7. Scope and Limitations



\- This contribution affects \*\*only UI layout and component structure\*\*.

\- No changes are made to:

&nbsp; - solver execution,

&nbsp; - output generation logic,

&nbsp; - Redux state structure.

\- The Output panel does not introduce new functionality beyond layout and modularization.



---



\## 8. Design Rationale



This refactor was introduced to:



\- implement the \*\*“Output on the side”\*\* wishlist item of the LoIDE paper,

\- improve usability on desktop environments,

\- reduce navigation friction,

\- increase code modularity and readability,

\- prepare the UI for future extensions involving multiple panels.



---



\## 9. Summary



This contribution implements the \*\*“Output on the side”\*\* wishlist item of the LoIDE paper draft by transforming the Output view from a standalone screen into a modular, responsive side panel.

The result is a smoother desktop workflow, improved maintainability, and a clearer separation between layout and output logic.



