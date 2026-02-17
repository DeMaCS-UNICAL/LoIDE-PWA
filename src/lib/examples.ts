// src/lib/examples.ts

export interface IExampleProgram {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  suggested_solver?: string;
}

/**
 * Tipo del contenuto dei file JSON di esempio.
 * Ogni JSON deve avere questi campi.
 */
interface IExampleFile {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  suggested_solver?: string;
}

// Importa TUTTI i .json nella cartella src/examples/
// grazie a Vite (import.meta.glob)
//
// Ogni nuovo file src/examples/*.json viene incluso automaticamente.
const exampleModules = import.meta.glob("../examples/!(examples-schema).json", {
  eager: true,
});

/**
 * Converte i moduli importati in un array di IExampleProgram.
 */
export const EXAMPLE_PROGRAMS: IExampleProgram[] = Object.values(exampleModules)
  .map((mod) => {
    // Vite esporta il JSON di solito come default
    const data = (mod as any).default as IExampleFile;

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      language: data.language,
      code: data.code,
      suggested_solver: data.suggested_solver ?? undefined,
    };
  })
  // opzionale: ordina per titolo, così la lista è deterministica
  .sort((a, b) => a.title.localeCompare(b.title));
