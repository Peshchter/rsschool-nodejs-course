import { Injectable } from '@nestjs/common';
import { UserDTO } from './user.model';
import * as usersRepo from './user.db.repository';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class UsersService {
  constructor(private readonly taskService: TasksService) { };

  create(createUserDto: UserDTO) {
    return usersRepo.save(createUserDto);
  }

  findAll() {
    return usersRepo.getAll();
  }

  findOne(id: string) {
    return usersRepo.getById(id);
  }  
  
  findByLogin(login: string) {
    return usersRepo.getByLogin(login);
  }

  update(id: string, updateUserDto: UserDTO) {
    return usersRepo.update(id, updateUserDto);
  }

  async remove(id: string) {
    await this.taskService.removeUserId(id);
    return usersRepo.remove(id);
  }
}
