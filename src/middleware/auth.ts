import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../common/config';

export function checkAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header('Authorization');
    if (authHeader === undefined) {
        res.status(401).send('Unauthorized!');
    } else {
        const [type, tokenString] = authHeader.split(' ');
        if (type !== 'Bearer' || tokenString === 'undefined' || tokenString === undefined ){
            res.status(401).send('Wrong auth type!');
        }else{
            try {
                jwt.verify(tokenString, config.JWT_SECRET_KEY);
            }catch(e){
                res.status(401).send('Unauthorized!');
            }
            return next();
        }   
    }
}


