import React, { useEffect, useState } from "react";
import string from "../string/string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";

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
    if (formValue.currentSteps.length >= formValue.outputNumbers.length - 1) {
      return;
    }
    setTimeout(() => {
      setFromValue({
        ...formValue,
        currentSteps: [
          ...formValue.currentSteps,
          formValue.outputNumbers[step],
        ],
      });
      setStep(step + 1);
    }, 500);
    console.log(step);
  }, [formValue, step]);

  const getFibonacciString = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const n: number = Number(formValue.inputNumber);
    const numberList: Array<number> = [0, 1];
    if (typeof n === "number") {
      for (let i = 2; i < n + 2; i++) {
        numberList.push(numberList[i - 2] + numberList[i - 1]);
      }
    }
    setFromValue({ ...formValue, outputNumbers: numberList, currentSteps: [] });
    setStep(1);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={string.pageContainer}>
        <form className={string.containerInput} onSubmit={getFibonacciString}>
          <Input
            maxLength={19}
            isLimitText
            max={19}
            type="number"
            name="lettersInput"
            value={formValue.inputNumber}
            onChange={(e) =>
              setFromValue({ ...formValue, inputNumber: e.currentTarget.value })
            }
          />
          <Button
            text="Развернуть"
            type="submit"
            isLoader={step >= formValue.outputNumbers.length ? false : true}
            disabled={formValue.inputNumber === ""}
          />
        </form>
        <div className={string.containerCircle}>
          {formValue.currentSteps &&
            formValue.currentSteps.map((element, index) => {
              return <Circle letter={`${element}`} index={index} key={index} />;
            })}
        </div>
      </div>
    </SolutionLayout>
  );
};
