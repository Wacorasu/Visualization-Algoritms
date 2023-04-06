export interface IListAction {
  isActive: boolean;
  isActiveAt: boolean;
  initialMassive: string[];
  targetData?: string;
  activeIndex: number | null;
  steps: number | null;
  isTail: boolean;
}
