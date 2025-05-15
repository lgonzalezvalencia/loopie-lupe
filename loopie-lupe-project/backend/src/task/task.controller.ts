import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { Task } from '../entity/Task';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    const logger = new Logger();
    logger.log('Request Body:', JSON.stringify(createTaskDto));

    if (!createTaskDto || Object.keys(createTaskDto).length === 0) {
      logger.warn('Request body is empty or invalid');
      throw new BadRequestException('Body cannot be empty');
    }

    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll() {
    const logger = new Logger();
    logger.log('Get all being called');
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const logger = new Logger();
    logger.log('Get one being called on Task:', id);
    return this.taskService.findOne(+id);
  }

  @Patch(':id') // Make it only change changed attributes
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const logger = new Logger();
    logger.log('Patch being called on Task:', id);
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const logger = new Logger();
    logger.log('Delete being called on Task:', id);
    return this.taskService.remove(+id);
  }
}
