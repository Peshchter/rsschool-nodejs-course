import { Injectable } from '@nestjs/common';
import { Task } from './task.model';
import * as tasksRepo from './task.db.repository';

@Injectable()
export class TasksService {
  create(createTaskDto: Task) {
    return tasksRepo.save(createTaskDto);
  }

  findAll() {
    return tasksRepo.getAll();
  }

  findOne(id: string) {
    return tasksRepo.getById(id);
  }

  update(id: string, updateTaskDto: Task) {
    return tasksRepo.update(id, updateTaskDto);
  }

  remove(id: string) {
    return tasksRepo.remove(id);
  }

  removeOnBoard(boardId:string) {
    return tasksRepo.removeOnBoard(boardId);
  }

  removeUserId(userId : string){
    return tasksRepo.removeUserId(userId);
  }
}
