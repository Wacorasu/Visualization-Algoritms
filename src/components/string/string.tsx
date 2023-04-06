import React, { useState, useEffect } from "react";
import string from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { getSteps } from "../../utils/string";
import { LettersStep } from "../../types/string";
import { ElementStates } from "../../types/element-states";
import { IInput } from "../../types";

export const StringComponent: React.FC = () => {
  const [formValue, setFromValue] = useState<IInput>({
    inputData: "",
  });
  const [steps, setSteps] = useState<LettersStep<string>[]>([]);
  const [currentStep, setCurrentStep] = useState<LettersStep<string> | null>(
    null
  );
  const [stepsIndex, setStepsIndex] = useState<number>(0);

  useEffect(() => {
    if (steps.length === 0 || stepsIndex >= steps.length) {
      return;
    }
    setCurrentStep(steps[stepsIndex]);
    setTimeout(() => {
      setStepsIndex(stepsIndex + 1);
    }, 2000);
  }, [steps, currentStep, stepsIndex]);

  const getReverseString = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const letters = formValue.inputData.toUpperCase();
    setCurrentStep(null);
    setStepsIndex(0);
    setSteps(getSteps(letters));
  };

  return (
    <SolutionLayout title="Строка">
      <div className={string.pageContainer}>
        <form className={string.containerInput} onSubmit={getReverseString}>
          <Input
            maxLength={11}
            isLimitText
            name="lettersInput"
            value={formValue.inputData}
            onChange={(e) => {
              setFromValue({
                ...formValue,
                inputData: e.currentTarget.value,
              });
            }}
          />
          <Button
            text="Развернуть"
            type="submit"
            isLoader={stepsIndex >= steps.length ? false : true}
            disabled={formValue.inputData === ""}
          />
        </form>
        <div className={string.containerCircle}>
          {currentStep &&
            currentStep.letters.map((element, index) => {
              let stateClass: ElementStates | undefined =
                steps.length === 0 || stepsIndex >= steps.length
                  ? ElementStates.Modified
                  : ElementStates.Default;
              if (currentStep.index !== undefined) {
                const stepIndex = currentStep.index[0];
                if (
                  index === stepIndex ||
                  index === currentStep.letters.length - stepIndex - 1
                ) {
                  stateClass = currentStep.state;
                } else if (
                  index <= stepIndex ||
                  index >= currentStep.letters.length - stepIndex - 1
                ) {
                  stateClass = ElementStates.Modified;
                }
              }
              return <Circle letter={element} state={stateClass} />;
            })}
        </div>
      </div>
    </SolutionLayout>
  );
};
