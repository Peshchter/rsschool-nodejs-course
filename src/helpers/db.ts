import "reflect-metadata";
import { getConnection, createConnection, ConnectionOptions } from "typeorm";
import {config} from "../common/ormconfig";

const ConnectToDB = async () => {
    let connection;
    try {
        connection = getConnection();
    }catch (e)
    {
        // console.error("Нет существующих подключений. Предпринимается попытка создания...\n", e)
    }
    if(connection) {
        if (!connection.isConnected) await connection.connect();
    }else {
        try {
        await createConnection(config as ConnectionOptions)
        } catch (e) {
            // console.log(e);

        }
    }
}

export const TryDBConnect = async (callback: () => void) => {
    try 
    {
        await ConnectToDB();
        callback();
    }
    catch (e) {
       // console.log("Невозможно соединиться с базой!");
    }
}