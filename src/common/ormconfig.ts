import dotenv from 'dotenv';
import path from 'path';
import {ConnectionOptions} from "typeorm";
import {User} from "../resources/users/user.model";
import {Task} from "../resources/tasks/task.model";
import {Board} from "../resources/boards/board.model";

dotenv.config({
    path: path.join(__dirname, '../../.env')
});

export const config : ConnectionOptions= {
    type: "postgres",
    host: process.env['POSTGRES_HOST'],
    port: Number(process.env['POSTGRES_PORT']),
    username: process.env['POSTGRES_USER'],
    password: process.env['POSTGRES_PASSWORD'],
    database: process.env['POSTGRES_DB'],
    entities: [
        User, Task, Board
    ],
    logging: false,
//    autoReconnect: true,
    migrationsRun: false,
    // migrations: [ "migrations/*.ts"],
    cli: {
        migrationsDir: "migrations"
    }
};

export default config;