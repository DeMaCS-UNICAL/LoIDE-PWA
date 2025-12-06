// autocomplete-dicts.ts
import aggregates from "./aggregates.json";
import builtins from "./builtins.json";
import constants from "./constants.json";

export type AspEntry = {
  label: string;
  snippet: string;
  detail: string;
  documentation: string;
};

export type AspAutocompleteDict = {
  "#": Record<string, AspEntry>;
  "&": Record<string, AspEntry>;
  "language-constants": string[];
};

export const ASP_AUTOCOMPLETE_DICT: AspAutocompleteDict = {
  "#": aggregates["#"],
  "&": builtins["&"],
  "language-constants": constants["language-constants"] ?? [],
};

// Ritorna le completion per #, & o language-constants in formato Ace
export function getAspCompletionsForTrigger(
  trigger: "#" | "&" | "language-constants",
): {
  caption: string;
  snippet: string;
  meta: string;
  docHTML?: string;
}[] {
  if (trigger === "language-constants") {
    // U_INT, UT_INT, ecc.
    return (ASP_AUTOCOMPLETE_DICT["language-constants"] || []).map((c) => ({
      caption: c,
      snippet: c,
      meta: "conversion type",
    }));
  }

  const dict = ASP_AUTOCOMPLETE_DICT[trigger];
  if (!dict) return [];

  const meta =
    trigger === "#"
      ? "directive / aggregate"
      : "external atom";

  return Object.values(dict).map((elem) => ({
    caption: elem.label,     // es. "show"
    snippet: elem.snippet,   // es. "show ${1:p}/${2:n}"
    meta,
    docHTML: `<b>${elem.detail}</b><br/><pre>${elem.documentation}</pre>`,
  }));
}
