import pako from "pako";

function toBase64Url(bytes: Uint8Array): string {
  const base64 = btoa(String.fromCharCode(...bytes));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

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


export function encodeAspChefState(state: any): string {
  const json = JSON.stringify(state);
  const utf8 = new TextEncoder().encode(json);
  const deflated = pako.deflate(utf8, { raw: true });
  return toBase64Url(deflated);
}

export function generateAspChefUrl(programText: string): string {
  const state = buildAspChefState(programText);
  const encoded = encodeAspChefState(state);
  return `https://asp-chef.alviano.net/#${encoded}`;
}

export function openAspChefFromLoide(programText: string) {
  const url = generateAspChefUrl(programText);
  window.open(url, "_blank", "noopener,noreferrer");
}
