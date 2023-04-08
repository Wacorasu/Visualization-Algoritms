interface IStack<T> {
  push: (element: T) => void;
  pop: () => void;
  clear: () => void;
  getStack: () => T[];
}

export class Stack<T> implements IStack<T> {
  private stack: T[];

  constructor(stack: T[]) {
    this.stack = stack;
  }

  push(element: T) {
    this.stack.push(element);
  }

  pop() {
    this.stack.pop();
  }

  clear() {
    this.stack = [];
  }

  getStack() {
    return this.stack;
  }
}
