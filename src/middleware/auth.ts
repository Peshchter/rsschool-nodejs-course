import {Request, Response, NextFunction} from 'express'; 

export function auth (req: Request, _res: Response, next:NextFunction) {
    console.log(req.header);
    next();
};


