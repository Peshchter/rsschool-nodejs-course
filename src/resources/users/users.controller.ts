import { Controller, Get, Post, Body, Param, Delete, Put, HttpStatus, HttpException, Header, UseFilters, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserDTO } from './user.model';
import { Filter } from '../../common/filter';
import { AuthGuard } from 'guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @UseFilters(Filter)
  @Header('Content-Type', 'application/json')
  async create(@Body() createUserDto: UserDTO) {
    return User.toResponse(await this.usersService.create(createUserDto));
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @UseFilters(Filter)
  async findAll() {
    const users: User[] = await this.usersService.findAll();
    return users.map(User.toResponse);
  }

  @Get(':id')
  @UseFilters(Filter)
  @Header('Content-Type', 'application/json')
  async findOne(@Param('id') id: string) {
    const user: User | null = await this.usersService.findOne(id);
    if (user) {
      return User.toResponse(user);
    } else {
      throw new HttpException("Not found", HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  @UseFilters(Filter)
  @Header('Content-Type', 'application/json')
  async update(@Param('id') id: string, @Body() updateUserDto: UserDTO) {
    const user = await this.usersService.update(id, updateUserDto);
    return User.toResponse(user);
  }

  @Delete(':id')
  @UseFilters(Filter)
  @Header('Content-Type', 'application/json')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
  }
}
