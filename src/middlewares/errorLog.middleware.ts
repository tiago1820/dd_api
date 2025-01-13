import { Request, Response, NextFunction } from "express";
import mongodbConnection from "../databases/mongodb.connection";

const errorLogMiddleware = async (err: any, req: Request, res: Response, next: NextFunction) => {
    const errorLog = {
        route: req.originalUrl,
        method: req.method,
        message: err.message || "Unknown error",
        stack: err.stack || null,
        timestamp: new Date(),
    };

    try {
        const db = mongodbConnection.db;
        if (db) {
            await db.collection("error_logs").insertOne(errorLog);
        }
        console.error(`[ERROR] ${errorLog.timestamp.toISOString()} - Route: ${errorLog.route} - Message: ${errorLog.message}`);
    } catch (dbError) {
        console.error("Failed to log error in MongoDB: ", dbError);
    }

    res.status(err.status || 500).json({
        message: err.message || "Internal server error",
        error: process.env.NODE_ENV === "development" ? err.stack : undefined,   
    });

};

export default errorLogMiddleware;