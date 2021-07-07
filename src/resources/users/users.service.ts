import { Injectable } from '@nestjs/common';
import { User, UserDTO } from './user.model';
import { TasksService } from '../tasks/tasks.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../../common/config';

@Injectable()
export class UsersService {
  constructor(private readonly taskService: TasksService,
    @InjectRepository(User) private usersRepo: Repository<User> ) { };

  async create(createUserDto: UserDTO) {
    const pass = await bcrypt.hash(createUserDto.password, SALT_ROUNDS);
    return this.usersRepo.save(new User({ ...createUserDto, password: pass }));
  }

  findAll() {
    return this.usersRepo.find({ where: {} });
  }

  async findOne(id: string) {
    const result = await this.usersRepo.findOne(id);
    if (result === undefined) {
        return null;
    }
    return result;
  }  
  
  async findByLogin(login: string) {
    const result = await this.usersRepo.findOne({ where: { login } });
    if (result === undefined) {
        return null;
    }
    return result;
  }

  async update(id: string, updateUserDto: UserDTO) {
    let user = await this.usersRepo.findOne(id);
    if (user) {
        await this.usersRepo.update(id, updateUserDto);
        user = {...user, ...updateUserDto};
    } else {
        user = await this.create(updateUserDto);
    }
    return user;
  }

  async remove(id: string) {
    await this.taskService.removeUserId(id);
    return this.usersRepo.delete(id);
  }
}
