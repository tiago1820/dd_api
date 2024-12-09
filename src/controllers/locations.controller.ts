import { Request, Response, NextFunction } from "express";
import { client } from '../index';
import locationService from "../services/location.service";

class LocationController {

    async index(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const cachedLocations = await client.get(`locations?page=${page}&limit=${limit}`);
            if (cachedLocations) {
                res.status(200).json(JSON.parse(cachedLocations));
                return;
            }

            const data = await locationService.index(page, limit);

            await client.setEx(`locations?page=${page}&limit=${limit}`, 60, JSON.stringify(data));
            res.status(200).json(data);

        } catch (error) {
            next(error);
        }
    }

    async store(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = await locationService.store(req.body);
            res.status(201).json(data);
        } catch (error) {
            next(error);
        }
    }

    async show(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        try {
            const data = await locationService.show(Number(id));
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        try {
            const data = await locationService.update(Number(id), req.body);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    async destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        try {
            const message = await locationService.destroy(Number(id));
            res.status(200).json({ message });
        } catch (error) {
            next(error);
        }
    }

}

export default new LocationController();