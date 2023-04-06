import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stackClass from "./stack-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Stack } from "../../utils/stack";
import { IInput } from "../../types";

const stackC = new Stack<string>([]);

export const StackPage: React.FC = () => {
  const [formValue, setFromValue] = useState<IInput>({
    inputData: "",
  });
  const [stack, setStack] = useState<Array<string>>([]);
  const [step, setStep] = useState<number>(-1);
  const [activeAdd, setActiveAdd] = useState<boolean>(false);
  const [activeRemove, setActiveRemove] = useState<boolean>(false);

  useEffect(() => {
    if (!activeAdd && !activeRemove) {
      return;
    }
    if (activeAdd) {
      setTimeout(() => {
        setActiveAdd(false);
      }, 500);
    }
    if (activeRemove) {
      setTimeout(() => {
        removeFromStack();
      }, 500);
    }
    // eslint-disable-next-line
  }, [activeAdd, activeRemove]);

  const addToStack = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    stackC.push(formValue.inputData);
    setStack(stackC.getStack());
    setStep(step + 1);
    setActiveAdd(true);
    setFromValue({ ...formValue, inputData: "" });
  };

  const startRemoveFromStack = (): void => {
    setActiveRemove(true);
  };

  const removeFromStack = (): void => {
    stackC.pop();
    setActiveRemove(false);
    setStep(step - 1);
    setStack(stackC.getStack());
  };

  const setClear = (): void => {
    stackC.clear();
    setStack(stackC.getStack());
    setFromValue({ inputData: "" });
    setActiveAdd(false);
    setActiveRemove(false);
    setStep(-1);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={stackClass.pageContainer}>
        <div className={stackClass.containerInput}>
          <form className={stackClass.mainInput} onSubmit={addToStack}>
            <Input
              maxLength={4}
              isLimitText
              type="text"
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
              text="Добавить"
              type="submit"
              isLoader={activeAdd}
              disabled={formValue.inputData.length === 0 || activeRemove}
              extraClass={stackClass.inputField}
            />
            <Button
              text="Удалить"
              type="button"
              onClick={() => startRemoveFromStack()}
              isLoader={activeRemove}
              disabled={stack.length === 0 || activeAdd}
              extraClass={stackClass.inputField}
            />
          </form>
          <Button
            text="Очистить"
            type="button"
            isLoader={false}
            onClick={() => setClear()}
            disabled={stack.length === 0 || activeAdd || activeRemove}
          />
        </div>
        <div className={stackClass.containerCircle}>
          {stack &&
            stack.map((element, index) => {
              if (index === step) {
                return (
                  <Circle
                    letter={`${element}`}
                    index={index}
                    key={index}
                    head={"Top"}
                    state={
                      activeAdd || activeRemove
                        ? ElementStates.Changing
                        : ElementStates.Default
                    }
                  />
                );
              } else {
                return (
                  <Circle letter={`${element}`} index={index} key={index} />
                );
              }
            })}
        </div>
      </div>
    </SolutionLayout>
  );
};
