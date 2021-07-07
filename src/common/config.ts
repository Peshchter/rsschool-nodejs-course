import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const config = {
  PORT : Number(process.env['PORT']) || 4000,
  NODE_ENV: process.env['NODE_ENV'],
  MONGO_CONNECTION_STRING: process.env['MONGO_CONNECTION_STRING'],
  JWT_SECRET_KEY: process.env['JWT_SECRET_KEY'] || 'Secret!',
  AUTH_MODE: process.env['AUTH_MODE'] === 'true',
  ERROR_FILE: path.join(__dirname, '../../', process.env['ERROR_FILE'] || 'error.log') ,
  ACCESS_FILE: path.join(__dirname, '../../', process.env['ACCESS_FILE'] || 'access.log'),
  USE_FASTIFY: Boolean( process.env['USE_FASTIFY'] === 'true')
};

const SALT_ROUNDS : number = 10;

export {config, SALT_ROUNDS};