import express, {Request, Response, NextFunction} from 'express';
import {finished} from 'stream';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import {log, ValidationError} from './common/logging';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use((req, res, next) => {
    log(req, null);
    next();
    finished(res, () => {
        log(null, res);
    });
})

app.use(()=>{
    throw new ValidationError();
});

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
    }
    next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);

app.use((err: Error, _req:Request, res:Response, next:NextFunction) => {
    if( err instanceof ValidationError) {
        res.status(err.status).send(err.text);
        return;
    }
    next(err);
});

export {app};
