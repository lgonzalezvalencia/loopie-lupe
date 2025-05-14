import { Injectable } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';
import { dbCreate, findAll, findById, remove } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  create(createTaskDto: CreateTaskDto) {
    return dbCreate(createTaskDto);
  }

  findAll() {
    return findAll();
  }

  findOne(id: number) {
    return findById(id);
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return remove(id);
  }
}
