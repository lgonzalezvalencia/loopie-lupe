import { Injectable } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';
import { dbCreate, findAll, findById, remove, update } from './task.repository';
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

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return update(id, updateTaskDto);
  }

  remove(id: number) {
    return remove(id);
  }
}
