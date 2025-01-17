import { Request, Response, NextFunction } from "express";
import mongodbConnection from "../databases/mongodb.connection";

const notFoundMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const log = {
            route: req.originalUrl,
            method: req.method,
            message: "Route Not Found",
            ip: req.ip || req.connection.remoteAddress || "Unknown",
            timestamp: new Date(),
        };

        console.warn(`[${log.timestamp.toISOString()}] WARNING - ${log.message} - Route: ${log.route} - IP: ${log.ip}`);

        const db = mongodbConnection.db;
        if (db) {
            await db.collection("anomaly_logs").insertOne(log);
        }

        res.status(404).json({ message: "Route Not Found" });

    } catch (error) {
        console.error("Error in not found middleware:", error);
        next();
    }
}

export default notFoundMiddleware;