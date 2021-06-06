import {Request, Response} from 'express';
export function log(req: Request | null = null, res:Response | null = null): void{
    if (req){
        const {method, url} = req;
        const {...query} = req.params;

        console.log(`Received: method: ${method} , url: ${url}, query: ${query}`);
    }else if (res){
        const {statusCode} = res;
        console.log(`Send: statusCode: ${statusCode} `);
    }else {
        console.log(`info: default logging without parameters`);
    }
};
