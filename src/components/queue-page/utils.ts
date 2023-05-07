export class NodeQueue<T> {
  letter: T | string;
  index: number | null;
  constructor(letter: T | string, index: number | null) {
    this.letter = letter;
    this.index = index;
  }
}

interface IQueue<T> {
  enqueue: (element: T) => void;
  dequeue: () => void;
  clear: (init: NodeQueue<T>[]) => void;
  getHead: () => void;
  getTail: () => void;
  getQueue: () => NodeQueue<T>[];
}

export class Queue<T> implements IQueue<T> {
  private queue: NodeQueue<T>[];
  private head: number;
  private tail: number;

  constructor(queue: NodeQueue<T>[]) {
    this.queue = [...queue];
    this.head = -1;
    this.tail = -1;
  }

  enqueue(element: T) {
    if (this.tail < 0 || this.queue[this.tail].index !== null) {
      this.tail = this.tail + 1;
    }
    if (this.head < 0) {
      this.head = this.head + 1;
    }
    this.queue[this.tail] = { letter: element, index: this.tail };
  }

  dequeue() {
    this.queue[this.head] = { letter: "", index: null };
    if (this.tail > this.head) {
      this.head = this.head + 1;
    }
  }

  clear(init: NodeQueue<T>[]) {
    this.head = -1;
    this.tail = -1;
    this.queue = [...init];
  }

  getTail() {
    return this.tail;
  }

  getHead() {
    return this.head;
  }

  getQueue() {
    return this.queue;
  }
}
