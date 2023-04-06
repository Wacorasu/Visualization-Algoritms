import React, { useEffect, useState } from "react";
import queueClass from "../stack-page/stack-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Queue } from "../../utils/queue";
import { NodeQueue } from "../../utils/queue";
import { IInput } from "../../types";

const initialState: NodeQueue<string>[] = [
  { letter: "", index: null },
  { letter: "", index: null },
  { letter: "", index: null },
  { letter: "", index: null },
  { letter: "", index: null },
  { letter: "", index: null },
  { letter: "", index: null },
];

const queueC = new Queue<string>([...initialState]);

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
        dequeue();
      }, 500);
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
    queueC.clear([...initialState]);
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
              disabled={
                formValue.inputData.length === 0 ||
                activeRemove ||
                tail === queue.length - 1
              }
              extraClass={queueClass.inputField}
            />
            <Button
              text="Удалить"
              type="button"
              onClick={() => startDequeue()}
              isLoader={activeRemove}
              disabled={
                activeAdd ||
                head < 0 ||
                (head === tail && queue[head]?.index === null)
              }
              extraClass={queueClass.inputField}
            />
          </form>
          <Button
            text="Очистить"
            type="button"
            isLoader={false}
            onClick={() => setClear()}
            disabled={activeAdd || head < 0}
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
