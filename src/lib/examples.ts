// src/lib/examples.ts
import familyAncestor from "../examples/family-ancestor.lp?raw";
import graphColoring from "../examples/graph-coloring.lp?raw";
import simpleScheduling from "../examples/simple-scheduling.lp?raw";
import choiceAndConstraint from "../examples/choice-and-constraint.lp?raw";

export interface IExampleProgram {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
}

export const EXAMPLE_PROGRAMS: IExampleProgram[] = [
  {
    id: "family-ancestor",
    title: "Family: ancestor relation",
    description:
      "Small example with facts and recursive rules to compute the ancestor relation.",
    language: "asp",
    code: familyAncestor,
  },
  {
    id: "graph-coloring",
    title: "Graph 3-coloring",
    description: "Classic graph 3-coloring example on a tiny triangle graph.",
    language: "asp",
    code: graphColoring,
  },
  {
    id: "simple-scheduling",
    title: "Simple scheduling",
    description: "Assign three tasks to a single machine without overlaps in time.",
    language: "asp",
    code: simpleScheduling,
  },
  {
    id: "choice-and-constraint",
    title: "Choice and constraint",
    description:
      "Toy example that chooses a menu with exactly one main course and one drink.",
    language: "asp",
    code: choiceAndConstraint,
  },
];
