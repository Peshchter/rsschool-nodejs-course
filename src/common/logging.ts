import {Request, Response} from 'express';
import fs from 'fs';
import {config} from './config';

const errorfile = config.ERROR_FILE;
const errStream = fs.createWriteStream(errorfile, {flags: 'a'});;
// fs.access(errorfile, fs.constants.W_OK, (err) => {
//     if (err) {
//         errStream = process.stdout;
//     } else {
//         errStream = fs.createWriteStream(errorfile, {flags: 'a'});
//     }
// });

const accessfile =  config.ACCESS_FILE;
const accessStream = fs.createWriteStream(accessfile, {flags: 'a'});;
// fs.access(accessfile, fs.constants.W_OK, (err) => {
//     if (err) {
//         accessStream = process.stdout;
//     } else {
//         accessStream = fs.createWriteStream(accessfile, {flags: 'a'});
//     }
// });

export function log(req: Request | null = null, res: Response | null = null): void {
    if (req) {
        const {method, url, query, body} = req;
        accessStream.write(`Received: method: ${method} , url: ${url}, query: ${JSON.stringify(query)}, body: ${JSON.stringify(body)} \n` as string);
    } else if (res) {
        const {statusCode} = res;
        accessStream.write(`Send: statusCode: ${statusCode} \n`);
    } else {
        accessStream.write(`info: default logging without parameters\n`);
    }
}
export class ValidationError extends Error {
    status: number;

    text: string;

    constructor({
                    status = 400,
                    text = `Validation Error!`
                }={}) {
        super();
        this.status = status;
        this.text = text;
    }
}
export function error(err: Error): void {
    if (err instanceof ValidationError) {
        errStream.write(`Error: status: ${err.status}; text: ${err.text}\n`);
        return;
    }
    errStream.write(`Error: ${err} \n`);
}

export function criticalError(text: string): void {
    fs.writeFileSync(config.ERROR_FILE, `Critical Error: ${text}\n`, {flag: 'a'});
}



