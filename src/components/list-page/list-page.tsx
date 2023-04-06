import React, { useEffect, useState } from "react";
import listClass from "./list-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList } from "../../utils/list";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { IListAction } from "../../types/list";

const list = new LinkedList<string>();

export const ListPage: React.FC = () => {
  const initialActiveData: IListAction = {
    isActive: false,
    steps: null,
    initialMassive: [],
    targetData: "",
    activeIndex: null,
    isTail: false,
    isActiveAt: false,
  };

  const initialFormValue: {
    inputData: string;
    inputIndex: number;
  } = {
    inputIndex: -1,
    inputData: "",
  };
  const [formValue, setFromValue] = useState<{
    inputData: string;
    inputIndex: number;
  }>(initialFormValue);
  const [listPrint, setListPrint] = useState<Array<string>>([]);
  const [activeAdd, setActiveAdd] = useState<IListAction>(initialActiveData);
  const [activeRemove, setActiveRemove] =
    useState<IListAction>(initialActiveData);
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    if (!activeAdd && !activeRemove) {
      return;
    }
    if (activeAdd.isActive) {
      setTimeout(() => {
        setStep(step + 1);
      }, 1000);
    }
    if (activeAdd.steps && step > activeAdd.steps) {
      setActiveAdd(initialActiveData);
    }
    if (activeRemove.isActive) {
      setTimeout(() => {
        setStep(step + 1);
      }, 1000);
    }

    if (activeRemove.steps && step > activeRemove.steps) {
      setActiveRemove(initialActiveData);
    }
    // eslint-disable-next-line
  }, [activeAdd, activeRemove, step]);

  useEffect(() => {
    list.clear();
    for (let i = 0; i < 4; i++) {
      list.append(`${Math.floor(Math.random() * 10)}`);
    }
    setListPrint(list.print());
    // eslint-disable-next-line
  }, []);

  const addToHead = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    list.prepend(formValue.inputData);
    setStep(0);
    setActiveAdd({
      ...initialActiveData,
      isActive: true,
      steps: 1,
      targetData: formValue.inputData,
      initialMassive: listPrint,
      activeIndex: 0,
    });
    setListPrint(list.print());
    setFromValue(initialFormValue);
  };

  const addToTail = (): void => {
    list.append(formValue.inputData);
    setStep(0);
    setActiveAdd({
      ...initialActiveData,
      isActive: true,
      steps: 1,
      targetData: formValue.inputData,
      initialMassive: listPrint,
      activeIndex: listPrint.length - 1,
      isTail: true,
    });
    setListPrint(list.print());
    setFromValue(initialFormValue);
  };

  const removeHead = (): void => {
    list.removeHead();
    setStep(0);
    setActiveRemove({
      ...initialActiveData,
      isActive: true,
      steps: 1,
      initialMassive: listPrint,
      activeIndex: 0,
    });
    setListPrint(list.print());
  };

  const removeTail = (): void => {
    list.removeTail();
    setStep(0);
    setActiveRemove({
      ...initialActiveData,
      isActive: true,
      steps: 1,
      initialMassive: listPrint,
      activeIndex: listPrint.length - 1,
      isTail: true,
    });
    setListPrint(list.print());
  };

  const addAt = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    list.insertAt(formValue.inputData, formValue.inputIndex);
    setStep(0);
    setActiveAdd({
      ...initialActiveData,
      isActive: true,
      steps: formValue.inputIndex + 1,
      targetData: formValue.inputData,
      initialMassive: listPrint,
      activeIndex: formValue.inputIndex,
      isActiveAt: true,
    });
    setListPrint(list.print());
    setFromValue(initialFormValue);
  };

  const removeAt = (): void => {
    list.removeAt(formValue.inputIndex);
    setStep(0);
    setActiveRemove({
      ...initialActiveData,
      isActive: true,
      steps: formValue.inputIndex + 1,
      targetData: formValue.inputData,
      initialMassive: listPrint,
      activeIndex: formValue.inputIndex,
      isActiveAt: true,
    });
    setListPrint(list.print());
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={listClass.pageContainer}>
        <div className={listClass.containerInput}>
          <form className={listClass.mainInput} onSubmit={addToHead}>
            <Input
              maxLength={4}
              isLimitText
              type="text"
              name="lettersInput"
              value={formValue.inputData}
              extraClass={listClass.inputField}
              onChange={(e) => {
                setFromValue({
                  ...formValue,
                  inputData: e.currentTarget.value,
                });
              }}
            />
            <Button
              text="Добавить в head"
              type="submit"
              isLoader={
                activeAdd.isActive && !activeAdd.isTail && !activeAdd.isActiveAt
              }
              extraClass={listClass.inputButtonSmall}
              disabled={
                formValue.inputData.length === 0 ||
                activeRemove.isActive ||
                listPrint.length > 6 ||
                activeAdd.isTail ||
                activeAdd.isActiveAt
              }
            />
            <Button
              text="Добавить в tail"
              type="button"
              isLoader={
                activeAdd.isActive && activeAdd.isTail && !activeAdd.isActiveAt
              }
              extraClass={listClass.inputButtonSmall}
              onClick={() => addToTail()}
              disabled={
                (formValue.inputData.length === 0 ||
                  activeRemove.isActive ||
                  activeAdd.isActive ||
                  listPrint.length > 6) &&
                !activeAdd.isTail
              }
            />
            <Button
              text="Удалить из head"
              type="button"
              onClick={() => removeHead()}
              isLoader={
                activeRemove.isActive &&
                !activeRemove.isTail &&
                !activeAdd.isActiveAt
              }
              extraClass={listClass.inputButtonSmall}
              disabled={
                listPrint.length === 0 ||
                activeAdd.isActive ||
                0 === listPrint.length - 1 ||
                activeRemove.isTail
              }
            />
            <Button
              text="Удалить из tail"
              type="button"
              onClick={() => removeTail()}
              isLoader={activeRemove.isActive && activeRemove.isTail}
              extraClass={listClass.inputButtonSmall}
              disabled={
                (listPrint.length === 0 ||
                  activeRemove.isActive ||
                  activeAdd.isActive ||
                  0 === listPrint.length - 1) &&
                !activeRemove.isTail
              }
            />
          </form>
          <form className={listClass.mainInput} onSubmit={addAt}>
            <Input
              maxLength={4}
              max={listPrint.length - 1}
              isLimitText
              placeholder="Введите индекс"
              type="number"
              name="lettersInput"
              value={formValue.inputIndex > -1 ? `${formValue.inputIndex}` : ""}
              onChange={(e) => {
                setFromValue({
                  ...formValue,
                  inputIndex: Number(e.currentTarget.value),
                });
              }}
              extraClass={listClass.inputField}
            />
            <Button
              text="Добавить по индексу"
              type="submit"
              isLoader={activeAdd.isActive && activeAdd.isActiveAt}
              disabled={formValue.inputIndex < 0 || activeRemove.isActive}
              extraClass={listClass.inputButtonBig}
            />
            <Button
              text="Удалить по индексу"
              type="button"
              onClick={() => removeAt()}
              isLoader={activeRemove.isActive && activeRemove.isActiveAt}
              disabled={formValue.inputIndex < 0 || activeAdd.isActive}
              extraClass={listClass.inputButtonBig}
            />
          </form>
        </div>
        <div className={listClass.containerCircle}>
          {activeAdd.steps && step < activeAdd.steps
            ? activeAdd.initialMassive.map((element, index) => {
                const circle = (
                  <Circle
                    letter={`${activeAdd.targetData}`}
                    state={ElementStates.Changing}
                    isSmall
                  />
                );
                let currentIndex;
                if (activeAdd.isTail) {
                  currentIndex = activeAdd.initialMassive.length - 1;
                } else {
                  currentIndex = step;
                }
                return (
                  <>
                    <Circle
                      letter={`${element}`}
                      index={index}
                      key={index}
                      tail={
                        activeAdd.initialMassive.length - 1 === index
                          ? "tail"
                          : ""
                      }
                      head={
                        currentIndex === index
                          ? circle
                          : index === 0
                          ? "head"
                          : ""
                      }
                      state={
                        index < step
                          ? ElementStates.Changing
                          : ElementStates.Default
                      }
                    />
                    {index < activeAdd.initialMassive.length - 1 && (
                      <ArrowIcon />
                    )}
                  </>
                );
              })
            : activeRemove.steps && step < activeRemove.steps
            ? activeRemove.initialMassive.map((element, index) => {
                let circle = (
                  <Circle
                    letter={`${element}`}
                    state={ElementStates.Changing}
                    isSmall
                  />
                );
                let currentIndex;
                if (activeRemove.isTail) {
                  currentIndex = activeRemove.initialMassive.length - 1;
                } else {
                  currentIndex = step;
                }
                return (
                  <>
                    <Circle
                      letter={
                        index === activeRemove.activeIndex &&
                        index === currentIndex
                          ? ""
                          : `${element}`
                      }
                      index={index !== currentIndex ? index : undefined}
                      key={index}
                      tail={
                        currentIndex === index
                          ? circle
                          : activeRemove.initialMassive.length - 1 === index
                          ? "tail"
                          : ""
                      }
                      head={index === 0 ? "head" : ""}
                      state={
                        index < step
                          ? ElementStates.Changing
                          : ElementStates.Default
                      }
                    />
                    {index < activeRemove.initialMassive.length - 1 && (
                      <ArrowIcon />
                    )}
                  </>
                );
              })
            : listPrint.map((element, index) => {
                let currentIndex;
                if (activeAdd.isTail) {
                  currentIndex = listPrint.length - 1;
                } else {
                  currentIndex = activeAdd.activeIndex;
                }
                return (
                  <>
                    <Circle
                      letter={`${element}`}
                      index={index}
                      key={index}
                      tail={listPrint.length - 1 === index ? "tail" : ""}
                      head={0 === index ? "head" : ""}
                      state={
                        currentIndex !== null && currentIndex === index
                          ? ElementStates.Modified
                          : ElementStates.Default
                      }
                    />
                    {index < listPrint.length - 1 && <ArrowIcon />}
                  </>
                );
              })}
        </div>
      </div>
    </SolutionLayout>
  );
};
