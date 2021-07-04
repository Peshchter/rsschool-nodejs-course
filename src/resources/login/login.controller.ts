import { Controller, Post, Body, HttpStatus, HttpException, Header, UseFilters } from '@nestjs/common';
import { UserDTO } from '../users/user.model';
import { Filter } from '../../common/filter';
import { produceToken } from './login.service';

@Controller('login')
export class LoginController {

  @Post()
  @UseFilters(Filter)
  @Header('Content-Type', 'application/json')
  async create(@Body() body: UserDTO) {
    const { login, password } = body;
    const token = await produceToken(login, password);
    if (!token) {
        throw new HttpException('Forbidden!', HttpStatus.FORBIDDEN)
    } else {
        return JSON.stringify({token});
    }
  
  }
}
