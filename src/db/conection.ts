import { DataSource } from "typeorm";
import { Character } from "../models/characterModel";

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'tiago',
    password: '123456',
    database: 'dd_api',
    logging: true,
    entities: [Character],
    synchronize: false
});