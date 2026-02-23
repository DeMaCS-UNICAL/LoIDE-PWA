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
 * Content type of sample JSON files.
 * Each JSON must have these fields.
 */
interface IExampleFile {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  suggested_solver?: string;
}

/*
Import ALL .jsons into the src/examples/ folder; 
so each new src/examples/*.json file is automatically included.
The only one not included is the examples-schema.
*/
const exampleModules = import.meta.glob("../examples/!(examples-schema).json", {
  eager: true,
});

/**
 * Converts imported modules into an array of IExampleProgram.
 */
export const EXAMPLE_PROGRAMS: IExampleProgram[] = Object.values(exampleModules)
  .map((mod) => {
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
  .sort((a, b) => a.title.localeCompare(b.title));
