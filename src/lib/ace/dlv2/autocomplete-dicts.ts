import aggregates from "./aggregates.json";
import constraints from "./constraints.json";
import weak from "./weak.json";

export type AspEntry = {
  label: string;
  snippet: string;
  detail: string;
  documentation: string;
};

export type AspAutocompleteDict = {
  "#": Record<string, AspEntry>;
  weak: Record<string, AspEntry>;
  constraints: Record<string, AspEntry>;
};

export const ASP_AUTOCOMPLETE_DICT: AspAutocompleteDict = {
  "#": aggregates["#"],
  weak: weak["weak"],
  constraints: constraints["constraints"],
};

export function getAspCompletions(category: keyof AspAutocompleteDict) {
  const dict = ASP_AUTOCOMPLETE_DICT[category];
  if (!dict) return [];
  return Object.values(dict).map((elem) => ({
    caption: elem.label,
    snippet: elem.snippet,
    meta: category,
    docHTML: `<b>${elem.detail}</b><br/><pre>${elem.documentation}</pre>`,
  }));
}
