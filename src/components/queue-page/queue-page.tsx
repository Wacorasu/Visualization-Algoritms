import React, { useEffect, useState } from "react";
import queueClass from "../stack-page/stack-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Queue } from "./utils";
import { NodeQueue } from "./utils";
import { IInput } from "../../types";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { MAX_CIRCLE_WORD_LENGTH } from "../../constants/thresholds-values";

const initialState: NodeQueue<string>[] = [
  { letter: "", index: null },
  { letter: "", index: null },
  { letter: "", index: null },
  { letter: "", index: null },
  { letter: "", index: null },
  { letter: "", index: null },
  { letter: "", index: null },
];

const queueC = new Queue<string>(initialState);

export const QueuePage: React.FC = () => {
  const [formValue, setFromValue] = useState<IInput>({
    inputData: "",
  });
  const [queue, setQueue] = useState<NodeQueue<string>[]>(queueC.getQueue());
  const [tail, changeTail] = useState<number>(-1);
  const [head, changeHead] = useState<number>(-1);
  const [activeAdd, setActiveAdd] = useState<boolean>(false);
  const [activeRemove, setActiveRemove] = useState<boolean>(false);

  useEffect(() => {
    let animationAddTimeoutId: NodeJS.Timeout | undefined;
    let animationRemoveTimeoutId: NodeJS.Timeout | undefined;
    if (!activeAdd && !activeRemove) {
      clearTimeout(animationAddTimeoutId);
      clearTimeout(animationRemoveTimeoutId);
      return;
    }
    if (activeAdd) {
      animationAddTimeoutId = setTimeout(() => {
        setActiveAdd(false);
      }, SHORT_DELAY_IN_MS);
    }
    if (activeRemove) {
      animationRemoveTimeoutId = setTimeout(() => {
        dequeue();
      }, SHORT_DELAY_IN_MS);
    }
    // eslint-disable-next-line
  }, [activeAdd, activeRemove]);

  const enqueue = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    queueC.enqueue(formValue.inputData);
    setQueue(queueC.getQueue());
    setActiveAdd(true);
    changeHead(queueC.getHead());
    changeTail(queueC.getTail());
    setFromValue({ ...formValue, inputData: "" });
  };

  const startDequeue = (): void => {
    setActiveRemove(true);
  };

  const dequeue = (): void => {
    queueC.dequeue();
    setActiveRemove(false);
    changeHead(queueC.getHead());
    setQueue(queueC.getQueue());
  };

  const setClear = (): void => {
    queueC.clear(initialState);
    setQueue(queueC.getQueue());
    setFromValue({ inputData: "" });
    setActiveAdd(false);
    setActiveRemove(false);
    changeHead(queueC.getHead());
    changeTail(queueC.getTail());
  };
  return (
    <SolutionLayout title="Очередь">
      <div className={queueClass.pageContainer}>
        <div className={queueClass.containerInput}>
          <form className={queueClass.mainInput} onSubmit={enqueue}>
            <Input
              data-testid="inputQueue"
              maxLength={MAX_CIRCLE_WORD_LENGTH}
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
              data-testid="buttonQueueAdd"
              text="Добавить"
              type="submit"
              isLoader={activeAdd}
              disabled={
                formValue.inputData.length === 0 ||
                activeRemove ||
                tail === queue.length - 1
              }
              extraClass={queueClass.inputField}
            />
            <Button
              data-testid="buttonQueueRemove"
              text="Удалить"
              type="button"
              onClick={() => startDequeue()}
              isLoader={activeRemove}
              disabled={
                activeAdd ||
                queueC.getHead() < 0 ||
                (head === tail && queue[head]?.index === null)
              }
              extraClass={queueClass.inputField}
            />
          </form>
          <Button
            data-testid="buttonQueueReset"
            text="Очистить"
            type="button"
            isLoader={false}
            onClick={() => setClear()}
            disabled={activeAdd || queueC.getHead() < 0}
          />
        </div>
        <div className={queueClass.containerCircle}>
          {queue &&
            queue.map((element, index) => {
              return (
                <Circle
                  letter={`${element.letter}`}
                  index={index}
                  key={index}
                  tail={tail === index ? "tail" : ""}
                  head={head === index ? "head" : ""}
                  state={
                    (activeAdd && tail === index) ||
                    (activeRemove && head === index)
                      ? ElementStates.Changing
                      : ElementStates.Default
                  }
                />
              );
            })}
        </div>
      </div>
    </SolutionLayout>
  );
};
