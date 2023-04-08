export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  getSize: () => number;
  print: () => T[];
  prepend: (element: T) => void;
  removeHead: () => void;
  removeTail: () => void;
  removeAt: (position: number) => void;
  clear:()=>void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  insertAt(element: T, index: number) {
    const node = new Node(element);
    if (index === 0) {
      let temp = this.head;
      this.head = node;
      this.head.next = temp;
    } else {
      let curr = this.head;
      let currIndex = 0;
      while (currIndex !== index - 1 && curr) {
        curr = curr.next;
        currIndex++;
      }
      if (curr) {
        node.next = curr.next;
        curr.next = node;
      }
    }

    this.size++;
  }

  removeAt(index: number) {
    if (this.head !==null){
      if (index === 0) {
        this.head = this.head.next;
      } else {
        let curr = this.head;
        let currIndex = 0;
        while (currIndex !== index - 1 && curr.next) {
          curr = curr.next;
          currIndex++;
        }
        if (curr.next) {
          curr.next = curr.next?.next;
        }
        this.size--;
      }
    }
  }

  append(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size++;
  }

  prepend(element: T) {
    const node = new Node(element);
    let current;
    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      this.head = node;
      this.head.next = current;
    }
    this.size++;
  }

  removeHead() {
    if (this.head !== null) {
      this.head = this.head.next;
      this.size--;
    }
  }

  removeTail() {
    let current;

    if (this.head !== null) {
      current = this.head;
      while (current.next?.next) {
        current = current.next;
      }
      current.next = null;
    }
    this.size--;
  }

  getSize() {
    return this.size;
  }

  clear(){
    this.head=null;
  }

  print() {
    let curr = this.head;
    let res = [];
    while (curr) {
      res.push(curr.value);
      curr = curr.next;
    }
    return res;
  }
}
