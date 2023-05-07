import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import sorting from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { LettersStep } from "../../types/string";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import {
  MAX_LENGTH_SORT_ARRAY,
  MAX_VALUE_OF_SORT_ARRAY,
  MIN_LENGTH_SORT_ARRAY,
  MIN_VALUE_OF_SORT_ARRAY,
} from "../../constants/thresholds-values";
import { DELAY_IN_MS } from "../../constants/delays";
import { sortingMethods } from "./utils";

export const SortingPage: React.FC = () => {
  const [steps, setSteps] = useState<LettersStep<number>[]>([]);
  const [sortChoice, setSortChoice] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<{
    isLoading: boolean;
    type: string;
  }>({ isLoading: false, type: "" });
  const [currentStep, setCurrentStep] = useState<LettersStep<number> | null>(
    null
  );
  const [stepsIndex, setStepsIndex] = useState<number>(0);

  useEffect(
    () => {
      setSteps([
        {
          letters: getRandArray(
            MAX_LENGTH_SORT_ARRAY,
            MIN_LENGTH_SORT_ARRAY,
            MAX_VALUE_OF_SORT_ARRAY,
            MIN_VALUE_OF_SORT_ARRAY
          ),
          index: [],
          state: ElementStates.Default,
        },
      ]);
    },
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    let animationTimeoutId: NodeJS.Timeout | undefined;
    if (steps.length === 1 || stepsIndex >= steps.length) {
      setIsLoading({ isLoading: false, type: "" });
      clearTimeout(animationTimeoutId);
      return;
    }
    setCurrentStep(steps[stepsIndex]);
    animationTimeoutId = setTimeout(() => {
      setStepsIndex(stepsIndex + 1);
    }, DELAY_IN_MS);
  }, [steps, currentStep, stepsIndex]);

  const getRandArray = (
    lMax: number,
    lMin: number,
    max: number,
    min: number
  ): Array<number> => {
    const arrayLength = Math.floor(Math.random() * (lMax - lMin)) + lMin;
    const randomArray = [];
    for (let i = 0; i < arrayLength; i++) {
      randomArray.push(Math.floor(Math.random() * (max - min)) + min);
    }
    return randomArray;
  };

  const getNewMassive = (): void => {
    setCurrentStep(null);
    setStepsIndex(0);
    setSteps([
      {
        letters: getRandArray(
          MAX_LENGTH_SORT_ARRAY,
          MIN_LENGTH_SORT_ARRAY,
          MAX_VALUE_OF_SORT_ARRAY,
          MIN_VALUE_OF_SORT_ARRAY
        ),
        index: [],
        state: ElementStates.Default,
      },
    ]);
  };

  
  const handleSorting = (typeSorting: string, methodSorting: string): void => {
    setIsLoading({ isLoading: true, type: typeSorting });
    const sortingSteps: LettersStep<number>[]  =  sortingMethods(typeSorting, methodSorting, steps[0].letters)
    setCurrentStep(null);
    setStepsIndex(0);
    setSteps([steps[0], ...sortingSteps]);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={sorting.pageContainer}>
        <div className={sorting.containerButtons}>
          <div className={sorting.radioBoxContainer}>
            <RadioInput
              label="Выбор"
              checked={sortChoice}
              onChange={() => setSortChoice(true)}
              disabled={isLoading.isLoading}
            />
            <RadioInput
              label="Пузырёк"
              checked={!sortChoice}
              onChange={() => setSortChoice(false)}
              disabled={isLoading.isLoading}
            />
          </div>
          <div className={sorting.buttonsContainer}>
            <Button
              text="По возрастанию"
              type="button"
              sorting={Direction.Ascending}
              extraClass={sorting.button}
              isLoader={isLoading.type === "ascending" && isLoading.isLoading}
              disabled={isLoading.type !== "ascending" && isLoading.isLoading}
              onClick={() =>
                handleSorting(
                  "ascending",
                  sortChoice === true ? "choice" : "bubble"
                )
              }
            />
            <Button
              text="По убыванию"
              type="button"
              sorting={Direction.Descending}
              extraClass={sorting.button}
              isLoader={isLoading.type === "descending" && isLoading.isLoading}
              disabled={isLoading.type !== "descending" && isLoading.isLoading}
              onClick={() =>
                handleSorting(
                  "descending",
                  sortChoice === true ? "choice" : "bubble"
                )
              }
            />
          </div>
          <Button
            text="Новый массив"
            type="button"
            isLoader={false}
            extraClass={sorting.button}
            disabled={isLoading.isLoading}
            onClick={() => getNewMassive()}
          />
        </div>
        <div className={sorting.containerGraph}>
          {currentStep
            ? currentStep.letters.map((element, index) => {
                let stateClass: ElementStates | undefined =
                  ElementStates.Default;
                if (stepsIndex !== undefined && currentStep.index) {
                  if (
                    index === currentStep.index[1] ||
                    index === currentStep.index[0]
                  ) {
                    stateClass = currentStep.state;
                  }
                  if (
                    (index < currentStep.index[0] ||
                      stepsIndex >= steps.length) &&
                    sortChoice
                  ) {
                    stateClass = ElementStates.Modified;
                  }
                  if (
                    (index >
                      currentStep.letters.length - currentStep.index[2] - 1 ||
                      stepsIndex >= steps.length) &&
                    !sortChoice
                  ) {
                    stateClass = ElementStates.Modified;
                  }
                }
                return (
                  <Column index={element} key={index} state={stateClass} />
                );
              })
            : steps[0] &&
              steps[0].letters.map((item, index) => {
                return (
                  <Column index={item} key={index} state={steps[0].state} />
                );
              })}
        </div>
      </div>
    </SolutionLayout>
  );
};
