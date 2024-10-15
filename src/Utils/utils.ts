export const isObjectHaveKeys = (obj: any) => {
  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    return Object.keys(obj).length > 0;
  }
  return false;
};
export enum ColumnClasses {
  todo = "todo",
  inProgress = "in-progress",
  closed = "closed",
}
export const idToClass: { [key: number | string]: ColumnClasses } = {
  todoColumn: ColumnClasses?.todo,
  inProgressTasks: ColumnClasses?.inProgress,
  closedTasks: ColumnClasses?.closed,
};
export const priorityToIcon: Record<"high" | "medium" | "low", string> = {
  high: "images/RedExclamation.png",
  medium: "images/YellowExclamation.png",
  low: "images/lowPriority.png",
};
