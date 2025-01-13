import { Request, Response, NextFunction } from "express";
import mongodbConnection from "../databases/mongodb.connection";

const responseLogMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const originalSend = res.send;
    let responseSize = 0;

    res.send = function (body: any) {
        responseSize = Buffer.byteLength(typeof body === "string" ? body : JSON.stringify(body));
        return originalSend.call(this, body);
    };

    res.on("finish", async () => {
        const duration = Date.now() - start;
        const log = {
            route: req.originalUrl,
            method: req.method,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
            size: `${(responseSize / 1024).toFixed(2)}KB`,
            timestamp: new Date(),
        };

        try {
            const db = mongodbConnection.db;
            if(db) {
                await db.collection("response_logs").insertOne(log);
            }
        } catch (error) {
            console.error("Error logging response: ", error);
        }
    });

    next();
}

export default responseLogMiddleware;