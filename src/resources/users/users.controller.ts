import { Controller, Get, Post, Body, Param, Delete, Put, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { User, UserDTO } from './user.model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: UserDTO) {
    return User.toResponse(await this.usersService.create(createUserDto));
  }

  @Get()
  async findAll() {
    const users: User[] = await this.usersService.findAll();
    return users.map(User.toResponse);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const user: User | null = await this.usersService.findOne(id);
    if (user) {
      return res.status(HttpStatus.OK).json(User.toResponse(user))
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({ message: "user not found" });
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UserDTO) {
    const user = await this.usersService.update(id, updateUserDto);
    return User.toResponse(user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
  }
}
