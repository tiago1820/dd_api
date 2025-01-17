import { Request, Response, NextFunction } from "express";
import mongodbConnection from "../databases/mongodb.connection";

const filterLogMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { query, params, originalUrl, method } = req;

        const combinedParams = {
            ...query,
            ...(params.id ? { id: params.id.split(",") } : {}),
        };

        if (Object.keys(combinedParams).length > 0) {
            const log = {
                route: originalUrl,
                method,
                params: combinedParams,
                timestamp: new Date(),
            };

            const db = mongodbConnection.db;
            if (db) {
                await db.collection("filter_logs").insertOne(log);
            }

            console.log(`[${log.timestamp.toISOString()}] Filter Applied - Route: ${log.route} - Params: ${JSON.stringify(log.params)}`);
        }

        next();
    } catch (error) {
        console.error("Error logging filter usage: ", error);
        next();
    }
};

export default filterLogMiddleware;