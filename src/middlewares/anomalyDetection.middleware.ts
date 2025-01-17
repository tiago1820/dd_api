import { Request, Response, NextFunction } from "express";
import mongodbConnection from "../databases/mongodb.connection";

const requestFrequency: Record<string, { count: number; timestamp: number }> = {};
const THRESHOLD = 5;
const TIME_WINDOW = 60000;

const anomalyDetectionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ip = req.ip || req.connection.remoteAddress || "Unknown";
        const currentTime = Date.now();

        if (!requestFrequency[ip]) {
            requestFrequency[ip] = { count: 0, timestamp: currentTime };
        }

        const elapsedTime = currentTime - requestFrequency[ip].timestamp;

        if (elapsedTime > TIME_WINDOW) {
            requestFrequency[ip].count = 0;
            requestFrequency[ip].timestamp = currentTime;
        }

        requestFrequency[ip].count += 1;

        if (requestFrequency[ip].count > THRESHOLD) {
            const log = {
                ip,
                route: req.originalUrl,
                method: req.method,
                message: "High Traffic Detected",
                requests: requestFrequency[ip].count,
                timestamp: new Date(),
            };

            console.warn(`[${log.timestamp.toISOString()}] WARNING - ${log.message} - IP: ${log.ip} - Requests: ${log.requests}`);

            const db = mongodbConnection.db;
            if (db) {
                await db.collection("anomaly_logs").insertOne(log);
            }
        }

        next();
    } catch (error) {
        console.error("Error in anomaly detection middleware:", error);
        next();
    }
};

export default anomalyDetectionMiddleware;