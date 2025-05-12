export interface Task {
  id: number;
  name: string;
  imgUrl: string;
  status: string /* Enum */;
  details: string;
  dueDate: Date;
  repeat: string /* Enum */;
}
