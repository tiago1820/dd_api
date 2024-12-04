"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const app_1 = __importDefault(require("./app"));
const connection_1 = require("./db/connection");
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
exports.client = client;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connection_1.AppDataSource.initialize();
            console.log('Database conected');
            yield client.connect();
            app_1.default.listen(3001, () => {
                console.log('Server conected');
            });
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    });
}
main();
