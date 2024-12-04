"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const reformer_model_1 = require("../models/reformer.model");
const location_model_1 = require("../models/location.model");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'tiago',
    password: '123456',
    database: 'reformers',
    logging: true,
    entities: [reformer_model_1.Reformer, location_model_1.Location],
    synchronize: false
});
