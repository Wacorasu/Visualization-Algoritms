import React, { useEffect, useState } from "react";
import listClass from "./list-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList } from "./utils";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { IListAction } from "../../types/list";
import { DELAY_IN_MS } from "../../constants/delays";
import {
  MAX_CIRCLE_WORD_LENGTH,
  MAX_LIST_LENGTH,
  START_LIST_LENGTH,
} from "../../constants/thresholds-values";
import { HEAD, TAIL } from "../../constants/element-captions";
import { LIST_INITIAL_VALUES } from "../../constants/initial-values";

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
    let animationAddTimeoutId: NodeJS.Timeout | undefined;
    let animationRemoveTimeoutId: NodeJS.Timeout | undefined;
    if (!activeAdd && !activeRemove) {
      clearTimeout(animationAddTimeoutId);
      clearTimeout(animationRemoveTimeoutId);
      return;
    }
    if (activeAdd.isActive) {
      animationAddTimeoutId = setTimeout(() => {
        setStep(step + 1);
      }, DELAY_IN_MS);
    }
    if (activeAdd.steps && step > activeAdd.steps) {
      setActiveAdd(initialActiveData);
    }
    if (activeRemove.isActive) {
      animationRemoveTimeoutId = setTimeout(() => {
        setStep(step + 1);
      }, DELAY_IN_MS);
    }

    if (activeRemove.steps && step > activeRemove.steps) {
      setActiveRemove(initialActiveData);
    }
    // eslint-disable-next-line
  }, [activeAdd, activeRemove, step]);

  useEffect(() => {
    list.clear();
    for (let i = 0; i < START_LIST_LENGTH; i++) {
      list.append(LIST_INITIAL_VALUES[i]);
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
    setStep(1);
    setActiveRemove({
      ...initialActiveData,
      isActive: true,
      steps: 2,
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
      steps: formValue.inputIndex + 2,
      targetData: formValue.inputData,
      initialMassive: listPrint,
      activeIndex: formValue.inputIndex,
      isActiveAt: true,
    });
    setListPrint(list.print());
  };

  const getRemoveData = (
    index: number,
    element: string
  ): { state: ElementStates; tail: string | JSX.Element; letter: string } => {
    let circle = (
      <Circle letter={`${element}`} state={ElementStates.Changing} isSmall />
    );
    let currentIndex;
    let state;
    let tail;
    let letter;
    if (activeRemove.isTail) {
      currentIndex = activeRemove.initialMassive.length - 1;
      state = ElementStates.Default;
      if (currentIndex === index) {
        tail = circle;
      } else if (activeRemove.initialMassive.length - 1 === index) {
        tail = TAIL;
      } else tail = "";
      if (index === activeRemove.activeIndex && index === currentIndex) {
        letter = "";
      } else letter = `${element}`;
    } else {
      currentIndex = activeRemove.activeIndex;
      if (
        activeRemove.activeIndex &&
        step >= index &&
        step <= activeRemove.activeIndex
      ) {
        state = ElementStates.Changing;
      } else state = ElementStates.Default;
      if (currentIndex === index && index < step) {
        tail = circle;
      } else if (activeRemove.initialMassive.length - 1 === index) {
        tail = TAIL;
      } else tail = "";
      if (index === activeRemove.activeIndex && index < step) {
        letter = "";
      } else letter = `${element}`;
    }
    return { state, tail, letter };
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={listClass.pageContainer}>
        <div className={listClass.containerInput}>
          <form className={listClass.mainInput} onSubmit={addToHead}>
            <Input
              data-testid="inputListData"
              maxLength={MAX_CIRCLE_WORD_LENGTH}
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
              data-testid="buttonListAddHead"
              text="Добавить в head"
              type="submit"
              isLoader={
                activeAdd.isActive && !activeAdd.isTail && !activeAdd.isActiveAt
              }
              extraClass={listClass.inputButtonSmall}
              disabled={
                formValue.inputData.length === 0 ||
                activeRemove.isActive ||
                listPrint.length > MAX_LIST_LENGTH ||
                activeAdd.isTail ||
                activeAdd.isActiveAt
              }
            />
            <Button
              data-testid="buttonListAddTail"
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
                  listPrint.length > MAX_LIST_LENGTH) &&
                !activeAdd.isTail
              }
            />
            <Button
              data-testid="buttonListRemoveHead"
              text="Удалить из head"
              type="button"
              onClick={() => removeHead()}
              isLoader={
                activeRemove.isActive &&
                !activeRemove.isTail &&
                !activeAdd.isActiveAt &&
                !activeRemove
              }
              extraClass={listClass.inputButtonSmall}
              disabled={
                listPrint.length === 0 ||
                activeAdd.isActive ||
                0 === listPrint.length - 1 ||
                activeRemove.isTail ||
                activeRemove.isActive
              }
            />
            <Button
              data-testid="buttonListRemoveTail"
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
              data-testid="inputListIndex"
              isLimitText
              max={listPrint.length - 1}
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
              data-testid="buttonListAddOnIndex"
              text="Добавить по индексу"
              type="submit"
              isLoader={activeAdd.isActive && activeAdd.isActiveAt}
              disabled={
                formValue.inputIndex < 0 ||
                activeRemove.isActive ||
                !(listPrint.length > formValue.inputIndex) ||
                formValue.inputData.length === 0
              }
              extraClass={listClass.inputButtonBig}
            />
            <Button
              data-testid="buttonListRemoveOnIndex"
              text="Удалить по индексу"
              type="button"
              onClick={() => removeAt()}
              isLoader={activeRemove.isActive && activeRemove.isActiveAt}
              disabled={
                formValue.inputIndex < 0 ||
                activeAdd.isActive ||
                !(listPrint.length > formValue.inputIndex)
              }
              extraClass={listClass.inputButtonBig}
            />
          </form>
        </div>
        <div data-testid="circlesList" className={listClass.containerCircle}>
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
                  <div key={index} className={listClass.containerOutput}>
                    <Circle
                      letter={`${element}`}
                      index={index}
                      tail={
                        activeAdd.initialMassive.length - 1 === index
                          ? TAIL
                          : ""
                      }
                      head={
                        currentIndex === index
                          ? circle
                          : index === 0
                          ? HEAD
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
                  </div>
                );
              })
            : activeRemove.steps && step < activeRemove.steps
            ? activeRemove.initialMassive.map((element, index) => {
                const { letter, tail, state } = getRemoveData(index, element);
                return (
                  <div key={index} className={listClass.containerOutput}>
                    <Circle
                      letter={letter}
                      index={index}
                      tail={tail}
                      head={index === 0 ? HEAD : ""}
                      state={state}
                    />
                    {index < activeRemove.initialMassive.length - 1 && (
                      <ArrowIcon />
                    )}
                  </div>
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
                  <div key={index} className={listClass.containerOutput}>
                    <Circle
                      letter={`${element}`}
                      index={index}
                      tail={listPrint.length - 1 === index ? TAIL : ""}
                      head={0 === index ? HEAD : ""}
                      state={
                        currentIndex !== null && currentIndex === index
                          ? ElementStates.Modified
                          : ElementStates.Default
                      }
                    />
                    {index < listPrint.length - 1 && <ArrowIcon />}
                  </div>
                );
              })}
        </div>
      </div>
    </SolutionLayout>
  );
};
