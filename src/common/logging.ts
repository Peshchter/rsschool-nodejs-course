import {Request, Response} from 'express';
import path from 'path';
import fs from 'fs';
import {config} from './config';

const errorfile = path.resolve(__dirname, config.ERROR_FILE || 'error.log');
let errStream;
fs.access(errorfile, fs.constants.W_OK, (err) => {
    if (err) {
        errStream = process.stdout;
    } else {
        errStream = fs.createWriteStream(errorfile, {flags: 'a'});
    }
});

const accessfile = path.resolve(__dirname, config.ACCESS_FILE || 'access.log');
let accessStream;
fs.access(accessfile, fs.constants.W_OK, (err) => {
    if (err) {
        accessStream = process.stdout;
    } else {
        accessStream = fs.createWriteStream(errorfile, {flags: 'a'});
    }
});

export function log(req: Request | null = null, res: Response | null = null): void {
    if (req) {
        const {method, url, query, body} = req;
        accessStream.push(`Received: method: ${method} , url: ${url}, query: ${JSON.stringify(query)}, body: ${JSON.stringify(body)}`);
    } else if (res) {
        const {statusCode} = res;
        console.log(`Send: statusCode: ${statusCode} `);
    } else {
        console.log(`info: default logging without parameters`);
    }
}

export class ValidationError extends Error {
    status: number;

    text: string;

    constructor() {
        super();
        this.status = 400;
        this.text = `Validation Error!`
    }

}

export function error(): void {
    errStream.push('Error');
}


