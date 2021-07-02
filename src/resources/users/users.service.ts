import { Injectable } from '@nestjs/common';
import { UserDTO } from './user.model';
import * as usersRepo from './user.db.repository';

@Injectable()
export class UsersService {
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

  remove(id: string) {
    return usersRepo.remove(id);
  }
}
