import { log } from 'console';
import { Task } from '../entity/Task';
import { AppDataSource } from '../index';
import { CreateTaskDto } from './dto/create-task.dto';
import { Logger } from '@nestjs/common';

export const dbCreate = async (taskInput: CreateTaskDto) => {
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

export const findAll = async () => {
  const taskRepository = AppDataSource.getRepository(Task);
  return await taskRepository.find();
};

export const findById = async (id_var: number) => {
  const taskRepository = AppDataSource.getRepository(Task);
  const task = await taskRepository.findOneBy({
    id: id_var,
  });
  return task;
};

export const update = (id: number, task: Task) => {};

export const remove = async (id: number) => {
  const taskRepository = AppDataSource.getRepository(Task);
  const result = await taskRepository.delete(id);
  return result.affected > 0;
};
