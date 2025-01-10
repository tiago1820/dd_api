import { config } from "dotenv";
config();

export const DB_TYPE= process.env.DB_TYPE;
export const DB_HOST= process.env.DB_HOST;
export const DB_PORT= parseInt(process.env.DB_PORT || "3306", 10);
export const DB_USERNAME= process.env.DB_USERNAME;
export const DB_PASSWORD= process.env.DB_PASSWORD;
export const DB_DATABASE= process.env.DB_DATABASE;
export const DB_LOGGING= process.env.DB_LOGGING === "true";
export const DB_SYNCHRONIZE= process.env.DB_SYNCHRONIZE === "false";
export const API_URL = process.env.API_URL;