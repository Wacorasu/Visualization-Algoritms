import React, { useEffect, useState } from "react";
import string from "../string/string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { MAX_FIBONACCI_NUMBER } from "../../constants/thresholds-values";
import { getFibonacciNumbers } from "./utils";

export const FibonacciPage: React.FC = () => {
  const [formValue, setFromValue] = useState<{
    inputNumber: string;
    outputNumbers: Array<number>;
    currentSteps: Array<number>;
  }>({
    inputNumber: "",
    outputNumbers: [],
    currentSteps: [],
  });

  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    const animationTimeoutId: NodeJS.Timeout = setTimeout(() => {
      setFromValue({
        ...formValue,
        currentSteps: [
          ...formValue.currentSteps,
          formValue.outputNumbers[step],
        ],
      });
      setStep(step + 1);
    }, SHORT_DELAY_IN_MS);
    if (formValue.currentSteps.length >= formValue.outputNumbers.length - 1) {
      clearTimeout(animationTimeoutId);
      return;
    }
  }, [formValue, step]);

  const getFibonacciString = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const n: number = Number(formValue.inputNumber);
    setFromValue({
      ...formValue,
      outputNumbers: getFibonacciNumbers(n),
      currentSteps: [],
    });
    setStep(1);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={string.pageContainer}>
        <form className={string.containerInput} onSubmit={getFibonacciString}>
          <Input
            data-testid="inputFibonacci"
            isLimitText
            max={MAX_FIBONACCI_NUMBER}
            type="number"
            name="lettersInput"
            value={formValue.inputNumber}
            onChange={(e) =>
              setFromValue({ ...formValue, inputNumber: e.currentTarget.value })
            }
          />
          <Button
            data-testid="buttonFibonacci"
            text="Рассчитать"
            type="submit"
            isLoader={step >= formValue.outputNumbers.length ? false : true}
            disabled={formValue.inputNumber === ""}
          />
        </form>
        <div className={string.containerCircle}>
          {formValue.currentSteps.length > 0 &&
            formValue.currentSteps.map((element, index) => {
              return <Circle letter={`${element}`} index={index} key={index} />;
            })}
        </div>
      </div>
    </SolutionLayout>
  );
};
