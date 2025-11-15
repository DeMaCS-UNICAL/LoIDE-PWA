import pako from "pako";

/**
 * JSON minimale per ASP-Chef:
 * - input: programma ASP
 * - language: "asp"
 * - solver: "clingo"
 * - qualche opzione di default realistica
 */
export function buildAspChefState(programText: string) {
  return {
    input: [programText],
    encode_input: false,
    decode_output: false,
    language: "asp",
    solver: "clingo",
    options: {
      clingo: {
        arguments: "",
        models: "1",
        opt_mode: "opt",
        time_limit: "",
        free_choice: false,
        filter: "",
        theme: "light",
        graph: {
          engine: "dot",
          layout: "dot",
        },
        trace: {
          enabled: false,
          options: "",
          engine: "clingo",
          style: "html",
          colorscheme: "set14",
          theme: "default",
        },
        trace_colors: true,
      },
    },
    output: {
      theme: "default",
    },
  };
}

/**
 * Encode ASP-Chef state usando:
 *   JSON → UTF-8 → zlib (header) → Base64 standard
 */
export function encodeAspChefState(state: any): string {
  const json = JSON.stringify(state);
  const utf8 = new TextEncoder().encode(json);

  // ⚠️ NIENTE { raw: true } → usiamo zlib con header, come fa il token eJz...
  const deflated = pako.deflate(utf8); // default = zlib stream

  // Base64 standard (btoa su stringa binaria)
  let binary = "";
  for (let i = 0; i < deflated.length; i++) {
    binary += String.fromCharCode(deflated[i]);
  }
  const base64 = btoa(binary);

  return base64;
}

/**
 * Genera la URL finale per ASP-Chef
 */
export function generateAspChefUrl(programText: string): string {
  const state = buildAspChefState(programText);
  const encoded = encodeAspChefState(state);
  return `https://asp-chef.alviano.net/#${encoded}`;
}

/**
 * Apre ASP-Chef in una nuova tab con l'input corrente di LoIDE
 */
export function openAspChefFromLoide(programText: string) {
  const url = generateAspChefUrl(programText);
  window.open(url, "_blank", "noopener,noreferrer");
}
