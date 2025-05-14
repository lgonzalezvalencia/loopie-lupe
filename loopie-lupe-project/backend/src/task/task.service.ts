import { Injectable } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';
import { dbCreate } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  create(createTaskDto: CreateTaskDto) {
    dbCreate(createTaskDto);
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
