import { Request, Response, NextFunction } from "express";
import { API_URL } from "../constants";

class APIController {

    async index(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = {
                "reformers": `${API_URL}reformer`,
                "locations": `${API_URL}location`
            };
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
}

export default new APIController();