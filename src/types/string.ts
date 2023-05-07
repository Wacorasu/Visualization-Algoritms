import { ElementStates } from "./element-states";

export interface LettersStep<T> {
  letters: T[];
  index?: number[];
  state?: ElementStates;
}
