export interface ILanguageData {
  name: string;
  value: string;
  solvers: ISolverData[];
}

export interface ISolverData {
  name: string;
  value: string;
  executors: IExecutorData[];
  options?: IOptionsData[];
}

export interface IExecutorData {
  name: string;
  value: string;
}

export interface IOptionsData {
  name: string;
  value: string;
  word_argument: boolean;
  description: string;
}

export interface ILoideRunData {
  language: string;
  engine: string;
  executor: string;
  program: string[];
  option?: { name: string; value: string[] }[];
}

export interface IOutputData {
  model: string;
  error: string;
}

export interface IOutputProblemData {
  reason: string;
}
