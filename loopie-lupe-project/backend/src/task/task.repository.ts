import { Task } from '../entity/Task';
import { AppDataSource } from '../index';
import { CreateTaskDto } from './dto/create-task.dto';

export const create = async (taskInput: CreateTaskDto) => {
  const task = new Task();
  task.name = taskInput.name;
  task.details = taskInput.details;
  task.dueDate = taskInput.dueDate;
  task.imgUrl = taskInput.imgUrl;
  task.repeat = taskInput.repeat;
  task.status = taskInput.status;

  const taskRepository = AppDataSource.getRepository(Task);
  await taskRepository.save(task);
};

export const findAll = () => {};

export const findById = (id: number) => {};

export const update = (id: number, task: Task) => {};

export const remove = (id: number) => {};
