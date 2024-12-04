import { Request, Response, NextFunction } from "express";
import { client } from '../index';
import reformerService from "../services/reformer.service";

class ReformersController {

    async index(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const cachedReformers = await client.get('reformers');
            if (cachedReformers) {
                res.status(200).json(JSON.parse(cachedReformers));
                return;
            }

            const data = await reformerService.index();

            if (data.length === 0) {
                res.status(200).json({ message: "No reformers found." });
                return;
            }

            const transformedData = {
                info: {
                    count: data.length,
                    pages: 1,
                    next: null,
                    prev: null,
                },
                results: data.map((reformer) => ({
                    id: reformer.id,
                    name: reformer.name,
                    born: reformer.born,
                    died: reformer.died,
                    url: `http://localhost:3001/api/reformer/${reformer.id}`,
                    image: reformer.image,
                    created: reformer.createdAt,
                    placeOfBirth: reformer.placeOfBirth
                        ? {
                            name: reformer.placeOfBirth.name,
                            url: `http://localhost:3001/api/location/${reformer.placeOfBirth.id}`
                        }
                        : null,
                    placeOfDeath: reformer.placeOfDeath
                        ? {
                            name: reformer.placeOfDeath.name,
                            url: `http://localhost:3001/api/location/${reformer.placeOfDeath.id}`
                        }
                        : null,
                })),
            };

            await client.setEx('reformers', 60, JSON.stringify(transformedData));
            res.status(200).json(transformedData);

        } catch (error) {
            next(error);
        }
    }

    async store(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const reformerData = {
                ...req.body,
                image: `http://localhost:3001/files/${req.file?.filename}`,
            };

            const data = await reformerService.store(reformerData);
            res.status(201).json(data);
        } catch (error) {
            next(error);
        }
    }

    async show(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        try {
            const data = await reformerService.show(Number(id));
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        try {
            const reformerData = {
                ...req.body,
                ...(req.file && { image: `http://localhost:3001/files/${req.file.filename}` }),
            };

            const data = await reformerService.update(Number(id), reformerData);
            res.status(200).json(data);

        } catch (error) {
            next(error);
        }
    }

    async destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        try {
            const message = await reformerService.destroy(Number(id));
            res.status(200).json({ message });
        } catch (error) {
            next(error);
        }
    }

    async setPlaceOfBirth(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { location_id, reformer_id } = req.body;
        try {
            const data = await reformerService.setPlaceOfBirth(Number(reformer_id), Number(location_id));
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    async setPlaceOfDeath(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { location_id, reformer_id } = req.body;
        try {
            const data = await reformerService.setPlaceOfDeath(Number(reformer_id), Number(location_id));
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

}

export default new ReformersController();