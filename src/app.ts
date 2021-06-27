import express, {Request, Response, NextFunction} from 'express';
import {finished} from 'stream';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import loginRouter from './resources/login/login.router';
import {criticalError, error, log, ValidationError} from './common/logging';
import {checkAuth} from './middleware/auth';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

process.on('uncaughtException', (err) => {
    criticalError(`At ${new Date().toLocaleTimeString("ru", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    })} occurred an Internal Server Error with message ${err.message}! Terminating ...`);
    process.exit(1);
});

app.use(express.json());

app.use((req, res, next) => {
    log(req, null);
    next();
    finished(res, () => {
        log(null, res);
    });
})

// app.use(()=>{
//     throw new ValidationError();
// });

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
    }
    next();
});

app.use('/error/:id', (req, _res, next) => {
    const id = +req.params.id;
    const err = new ValidationError({status: id, text: `Occurred a handled error with status ${id}`});
    next(err);
});
app.use('/users', checkAuth, userRouter);
app.use('/boards', checkAuth, boardRouter);
app.use('/reject', (_req, res) => {
    Promise.reject(Error('Oops!'));
    res.status(200).send('Rejection handled!');
});
app.use('/login', loginRouter);

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ValidationError) {
        res.status(err.status).send(err.text);
        error(err);
        return;
    }
    next(err);
});

process.on('unhandledRejection', () => {
    error(new ValidationError({status: 417, text: 'Request failed!'}));
});

export {app};
