import dotenv from 'dotenv';
import path from 'path';
import {User} from "../resources/users/user.model";

dotenv.config({
    path: path.join(__dirname, '../../.env')
});

export const config = {
    type: "postgres",
    host: process.env['POSTGRES_HOST'],
    port: process.env['POSTGRES_PORT'],
    username: process.env['POSTGRES_USER'],
    password: process.env['POSTGRES_PASSWORD'],
    database: process.env['POSTGRES_DB'],
    entities: [
        User
    ],
    synchronize: true,
    logging: false,
    autoReconnect: true
}