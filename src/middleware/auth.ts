import {Request, Response, NextFunction} from 'express'; 

export function auth (_req: Request, _res: Response, next:NextFunction) {
    console.log("check auth");
    next();
}