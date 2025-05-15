export class CreateTaskDto {
  name: string;
  imgUrl: string;
  status: 'TODO' | 'IN_PROGRESS' | 'ISSUE' | 'DONE' /* Enum */;
  details: string;
  dueDate: Date;
  repeat: 'NEVER' | 'DAILY' | 'WEEKLY' | 'MONTHLY' /* Enum */;
}
