import { Request, Response, NextFunction } from "express";
import mongodbConnection from "../databases/mongodb.connection";

const paginationLogMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { page, limit } = req.query;

    if (page) {
        const paginationLog = {
            route: req.originalUrl,
            method: req.method,
            page: parseInt(page as string) || 1,
            limit: parseInt(limit as string) || 20,
            timestamp: new Date(),
        };

        try {
            const db = mongodbConnection.db;
            if (db) {
                await db.collection("pagination_logs").insertOne(paginationLog);
            }
            console.log(
                `[${paginationLog.timestamp.toISOString()}] 
                Pagination Accessed - Route: ${paginationLog.route} - 
                Page: ${paginationLog.page} - 
                Limit: ${paginationLog.limit}`
            );

        } catch (error) {
            console.error("Error logging pagination: ", error);
        }
    }

    next();
};

export default paginationLogMiddleware;
