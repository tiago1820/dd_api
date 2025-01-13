import { Request, Response, NextFunction } from "express";
import mongodbConnection from "../databases/mongodb.connection";

const logMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const log = {
            method: req.method,
            route: req.originalUrl,
            queryParams: req.query,
            timestamp: new Date(),
            ip: req.ip || req.connection.remoteAddress,
            userAgent: req.headers["user-agent"] || "Unknown",
        };

        const db = mongodbConnection.db;
        if(db) {
            await db.collection("logs").insertOne(log);
        }

        next();
    } catch (error) {
        console.error("Error logging request:", error);
        next();
    }
}

export default logMiddleware;