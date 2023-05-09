import React, { useState, useEffect } from "react";
import string from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { getSteps } from "./utils";
import { LettersStep } from "../../types/string";
import { ElementStates } from "../../types/element-states";
import { IInput } from "../../types";
import { DELAY_IN_MS } from "../../constants/delays";
import { MAX_STRING_LENGTH } from "../../constants/thresholds-values";

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
    const animationTimeoutId: NodeJS.Timeout = setTimeout(() => {
      setStepsIndex(stepsIndex + 1);
    }, DELAY_IN_MS);
    if (stepsIndex >= steps.length) {
      setFromValue({ inputData: "" });
    }
    if (steps.length === 0 || stepsIndex >= steps.length) {
      clearTimeout(animationTimeoutId);
      return;
    }
    setCurrentStep(steps[stepsIndex]);
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
            data-testid='inputString'
            maxLength={MAX_STRING_LENGTH}
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
            data-testid="buttonString"
            text="Развернуть"
            type="submit"
            isLoader={stepsIndex >= steps.length ? false : true}
            disabled={formValue.inputData === ""}
          />
        </form>
        <div  className={string.containerCircle}>
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
              return <Circle data-testid={`output-${index}`} letter={element} state={stateClass} key={index} />;
            })}
        </div>
      </div>
    </SolutionLayout>
  );
};
