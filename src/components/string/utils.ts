import { LettersStep } from "../../types/string";
import { ElementStates } from "../../types/element-states";

export const getSteps = (source: string): LettersStep<string>[] => {
  const letters = source.split("");
  const steps: LettersStep<string>[] = [];

  if (letters.length === 0) {
    return steps;
  }

  steps.push({
    letters: [...letters],
  });

  let leftIndex = 0;
  let rightIndex = letters.length - leftIndex - 1;

  while (leftIndex <= rightIndex) {
    steps.push({
      letters: [...letters],
      index: [leftIndex],
      state: ElementStates.Changing,
    });

    letters[leftIndex] = source[rightIndex];
    letters[rightIndex] = source[leftIndex];
    steps.push({
      letters: [...letters],
      index: [leftIndex],
      state: ElementStates.Modified,
    });

    leftIndex++;
    rightIndex--;
  }
  return steps;
};
