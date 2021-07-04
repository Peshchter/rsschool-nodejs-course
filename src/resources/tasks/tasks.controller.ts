import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('/boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Param('boardId') boardId: string, @Body() createTaskDto: Task) {
    return this.tasksService.create({...createTaskDto, boardId});
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const task: Task | null = await this.tasksService.findOne(id);
    if (task) {
      return res.status(HttpStatus.OK).json(Task.toResponse(task))
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({ message: "task not found" });
    }
  }

  @Put(':id')
  update(@Param('boardId') boardId: string, @Param('id') id: string, @Body() updateTaskDto: Task) {
    return this.tasksService.update(id, {...updateTaskDto, boardId});
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.tasksService.remove(id);
  }
}
