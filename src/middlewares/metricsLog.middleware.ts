import { Request, Response, NextFunction } from "express";
import { Metrics } from "../interfaces/metricsLog.interface";
import mongodbConnection from "../databases/mongodb.connection";

const metrics: Metrics = {
    totalRequests: 0,
    routeAccessCount: {},
    totalErrors: 0,
};

const metricsLogMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        metrics.totalRequests += 1;

        const route = req.baseUrl + req.path;
        metrics.routeAccessCount[route] = (metrics.routeAccessCount[route] || 0) + 1;

        const originalSend = res.send;
        res.send = function (body) {
            if (res.statusCode >= 400) {
                metrics.totalErrors += 1;
            }
            return originalSend.call(this, body);
        };

        if (metrics.totalRequests % 100 === 0) {
            const mostAccessedRoute = Object.entries(metrics.routeAccessCount).reduce(
                (a, b) => (b[1] > a[1] ? b : a),
                ["", 0]
            )[0];
            const errorRate = ((metrics.totalErrors / metrics.totalRequests) * 100).toFixed(2);

            const log = {
                timestamp: new Date(),
                totalRequests: metrics.totalRequests,
                mostAccessedRoute,
                errorRate,
            };

            const db = mongodbConnection.db;
            if (db) {
                await db.collection("metrics_logs").insertOne(log);
            }

            console.log(`[${log.timestamp.toISOString()}] Metrics - Total Requests: ${log.totalRequests} - Most Accessed: ${log.mostAccessedRoute} - Error Rate: ${log.errorRate}%`);
        }
    } catch (error) {
        console.error("Error logging metrics: ", error);
    }

    next();
};

export default metricsLogMiddleware;
