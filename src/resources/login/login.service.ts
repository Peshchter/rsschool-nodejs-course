import * as usersRepo from '../users/user.db.repository';
import { config } from '../../common/config';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function produceToken( login : string, password: string ) {
    const user = await usersRepo.getByLogin(login);

    if (!user) {
        return null;
    }
    const result = await bcrypt.compare(password, user.password);

    if (!result){
        return null;
    }
    const userId = user.id;
    return jwt.sign({ userId, login }, config.JWT_SECRET_KEY!);

};
