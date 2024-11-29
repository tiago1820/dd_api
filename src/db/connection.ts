import { DataSource } from "typeorm";
import { Reformer } from "../models/reformer.model";
import { Location } from "../models/location.model";

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'tiago',
    password: '123456',
    database: 'reformers',
    logging: true,
    entities: [Reformer, Location],
    synchronize: false
});