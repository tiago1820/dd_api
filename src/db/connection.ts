import { DataSource } from "typeorm";
import { Character } from "../models/character.model";
import { Episode } from "../models/episode.model";

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'tiago',
    password: '123456',
    database: 'dd_api',
    logging: true,
    entities: [Character, Episode],
    synchronize: false
});