import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, HttpException, Header, UseFilters, UseGuards} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { Filter } from '../../common/filter';
import { AuthGuard } from 'guards/auth.guard';

@Controller('/boards/:boardId/tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseFilters(Filter)
  @Header('Content-Type', 'application/json')
  create(@Param('boardId') boardId: string, @Body() createTaskDto: Task) {
    return this.tasksService.create({...createTaskDto, boardId});
  }

  @Get()
  @UseFilters(Filter)
  @Header('Content-Type', 'application/json')
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @UseFilters(Filter)
  @Header('Content-Type', 'application/json')
  async findOne(@Param('id') id: string) {
    const task: Task | null = await this.tasksService.findOne(id);
    if (task) {
      return Task.toResponse(task);
    } else {
      throw new HttpException("Not found", HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  @UseFilters(Filter)
  @Header('Content-Type', 'application/json')
  update(@Param('boardId') boardId: string, @Param('id') id: string, @Body() updateTaskDto: Task) {
    return this.tasksService.update(id, {...updateTaskDto, boardId});
  }

  @Delete(':id')
  @UseFilters(Filter)
  @Header('Content-Type', 'application/json')
  async remove(@Param('id') id: string) {
    await this.tasksService.remove(id);
  }
}
