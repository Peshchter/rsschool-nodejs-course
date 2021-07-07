import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { config } from '../common/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const authHeader = context.switchToHttp().getRequest().headers.authorization;
        if (authHeader === undefined) {
            throw new UnauthorizedException();
        } else {
            const [type, tokenString] = authHeader.split(' ');
            if (type !== 'Bearer' || tokenString === 'undefined' || tokenString === undefined) {
                throw new UnauthorizedException();
            } else {
                try {
                    jwt.verify(tokenString, config.JWT_SECRET_KEY);
                } catch (e) {
                    throw new UnauthorizedException();
                }
                return true;
            }
        }
    }
}
