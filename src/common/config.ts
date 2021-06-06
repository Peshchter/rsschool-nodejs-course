import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const config = {
  PORT : process.env['PORT'],
  NODE_ENV: process.env['NODE_ENV'],
  MONGO_CONNECTION_STRING: process.env['MONGO_CONNECTION_STRING'],
  JWT_SECRET_KEY: process.env['JWT_SECRET_KEY'],
  AUTH_MODE: process.env['AUTH_MODE'] === 'true',
  ERROR_FILE: process.env['ERROR_FILE'] ,
  ACCESS_FILE: process.env['ACCESS_FILE']
};

export {config};