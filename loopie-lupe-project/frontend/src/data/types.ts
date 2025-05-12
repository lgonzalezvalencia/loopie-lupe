export interface Task {
  id: number;
  name: string;
  imgUrl: string;
  status: "TODO" | "IN_PROGRESS" | "ISSUE" | "DONE" /* Enum */;
  details: string;
  dueDate: Date;
  repeat: "NEVER" | "DAILY" | "WEEKLY" | "MONTHLY" /* Enum */;
}

export const STATUS_FLAGS = ["TODO", "IN_PROGRESS", "ISSUE", "DONE"];
export const REPEAT_FLAGS = ["NEVER", "DAILY", "WEEKLY", "MONTHLY"];