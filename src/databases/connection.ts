import { DataSource } from "typeorm";
import { Reformer } from "../models/reformer.model";
import { Location } from "../models/location.model";
import {
    DB_TYPE,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_DATABASE,
    DB_LOGGING,
    DB_SYNCHRONIZE
} from "../constants";

export const AppDataSource = new DataSource({
    type: DB_TYPE as any,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    logging: DB_LOGGING,
    entities: [Reformer, Location],
    synchronize: false
});