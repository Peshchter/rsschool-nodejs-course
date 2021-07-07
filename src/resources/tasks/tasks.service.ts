import { Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private tasksRepo: Repository<Task>){};
  
  create(createTaskDto: Task):Promise<Task> {
    const task = this.tasksRepo.create(createTaskDto);
    return this.tasksRepo.save(task);
  }

  findAll():Promise<Task[]> {    
    return this.tasksRepo.find({where: {}});
  }

  async findOne(id: string) :Promise<Task|null> {
    const result = await this.tasksRepo.findOne(id);
    if (result === undefined) {
        return null;
    }
    return result;
  }

  async update(id: string, updateTaskDto: Task):Promise<Task>  {
    const result = await this.tasksRepo.update(id, updateTaskDto);
    return result.raw;
  }

  async remove(id: string):Promise<void> {
    await this.tasksRepo.delete(id);
    return;
  }

  async removeOnBoard(boardId:string):Promise<void> {
    await this.tasksRepo.delete({boardId});
    return ;
  }

  async removeUserId(userId : string):Promise<void>{
    let list = await this.tasksRepo.find({userId});
    list = list.map(
        (e)=> ({...e, userId: null }));
    await this.tasksRepo.save(list);
  }
}
