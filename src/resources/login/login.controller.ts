import { Controller, Post, Body, HttpStatus, HttpException, Header, UseFilters } from '@nestjs/common';
import { UserDTO } from '../users/user.model';
import { Filter } from '../../common/filter';
import { LoginService } from './login.service';


@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @UseFilters(Filter)
  @Header('Content-Type', 'application/json')
  async create(@Body() body: UserDTO) {
    const { login, password } = body;
    const token = await this.loginService.produceToken(login, password);
    if (!token) {
        throw new HttpException('Forbidden!', HttpStatus.FORBIDDEN)
    } else {
        return JSON.stringify({token});
    }
  
  }
}
