import { Request, Response, NextFunction } from "express";

class APIController {

    async index(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = {
                "reformers": "http://localhost:3001/api/reformer",
                "locations": "http://localhost:3001/api/location"
            };
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
}

export default new APIController();