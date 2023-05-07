import { LettersStep } from "../../types/string";
import { ElementStates } from "../../types/element-states";

const swap = (
    arr: Array<number>,
    firstIndex: number,
    secondIndex: number
  ): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

export const sortingMethods = (typeSorting: string, methodSorting: string, numbersInput:number[]): LettersStep<number>[] => {
    let numbers = JSON.parse(JSON.stringify(numbersInput));
    const sortingSteps: LettersStep<number>[] = [];
    if (numbers.length===1) {
      sortingSteps.push(
        {
          letters: [...numbers],
          index: [0, 0],
          state: ElementStates.Modified,
        }
      )
    } else switch (methodSorting) {
      case "choice":
        for (let i = 0; i < numbers.length - 1; i++) {
          for (let j = i + 1; j < numbers.length; j++) {
            sortingSteps.push({
              letters: [...numbers],
              index: [i, j],
              state: ElementStates.Changing,
            });
            if (numbers[i] > numbers[j] && typeSorting === "ascending") {
              swap(numbers, i, j);
              sortingSteps.push({
                letters: [...numbers],
                index: [i, j],
                state: ElementStates.Changing,
              });
            }
            if (numbers[i] < numbers[j] && typeSorting === "descending") {
              swap(numbers, i, j);
              sortingSteps.push({
                letters: [...numbers],
                index: [i, j],
                state: ElementStates.Changing,
              });
            }
          }
        }
        break;
      case "bubble":
        for (let i = 0; i < numbers.length; i++) {
          for (let j = 0; j < numbers.length - i - 1; j++) {
            sortingSteps.push({
              letters: [...numbers],
              index: [j, j + 1, i],
              state: ElementStates.Changing,
            });
            if (numbers[j] > numbers[j + 1] && typeSorting === "ascending") {
              swap(numbers, j, j + 1);
              sortingSteps.push({
                letters: [...numbers],
                index: [j, j + 1, i],
                state: ElementStates.Changing,
              });
            }
            if (numbers[j] < numbers[j + 1] && typeSorting === "descending") {
              swap(numbers, j, j + 1);
              sortingSteps.push({
                letters: [...numbers],
                index: [j, j + 1, i],
                state: ElementStates.Changing,
              });
            }
          }
        }
        break;
      default:
        break;
    }
    return sortingSteps;
  };