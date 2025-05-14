import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  imgUrl: string;

  @Column()
  status: 'TODO' | 'IN_PROGRESS' | 'ISSUE' | 'DONE' /* Enum */;

  @Column()
  details: string;

  @Column()
  dueDate: Date;

  @Column()
  repeat: 'NEVER' | 'DAILY' | 'WEEKLY' | 'MONTHLY' /* Enum */;
}
