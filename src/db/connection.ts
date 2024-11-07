import { DataSource } from "typeorm";
import { Reformer } from "../models/reformer.model";
import { Episode } from "../models/episode.model";

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'tiago',
    password: '123456',
    database: 'reformersapi',
    logging: true,
    entities: [Reformer, Episode],
    synchronize: false
});