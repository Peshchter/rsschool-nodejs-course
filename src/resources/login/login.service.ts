import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service'; 
import { config } from '../../common/config';

@Injectable()
export class LoginService {
    constructor(private usersService: UsersService) { }
    
    async produceToken(login: string, password: string) {
        const user = await this.usersService.findByLogin(login);

        if (!user) {
            return null;
        }
        const result = await bcrypt.compare(password, user.password);

        if (!result) {
            return null;
        }
        const userId = user.id;
        return jwt.sign({ userId, login }, config.JWT_SECRET_KEY);

    }
}
