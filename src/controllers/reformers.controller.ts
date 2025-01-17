import { Request, Response, NextFunction } from "express";
import { client } from '../index';
import reformerService from "../services/reformer.service";
import { Image } from "../models/image.model";
import { API_URL, IMAGE_URL} from "../constants";

class ReformersController {

    async index(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name } = req.query;
            const page = parseInt(req.query.page as string) || 1;
            const limit = 20;

            if (name) {
                const names = (name as string).split(",").map((n) => n.trim());
                const data = await reformerService.filterByName(names);
                res.status(200).json(data);
                return;
            }

            const cacheKey = `reformers_page_${page}_limit_${limit}`;
            const cachedReformers = await client.get(cacheKey);
            if (cachedReformers) {
                res.status(200).json(JSON.parse(cachedReformers));
                return;
            }

            const { data, total } = await reformerService.index(page, limit);

            if (data.length === 0) {
                res.status(200).json({ message: "No reformers found." });
                return;
            }

            const totalPages = Math.ceil(total / limit);

            const transformedData = {
                info: {
                    count: total,
                    pages: totalPages,
                    next: page < totalPages ? `${API_URL}reformer?page=${page + 1}` : null,
                    prev: page > 1 ? `${API_URL}reformer?page=${page - 1}` : null,
                },
                results: data.map((reformer) => ({
                    id: reformer.id,
                    name: reformer.name,
                    born: reformer.born,
                    died: reformer.died,
                    contribution: reformer.contribution,
                    url: `${API_URL}reformer/${reformer.id}`,
                    image: reformer.image ? reformer.image.url : null,
                    created: reformer.createdAt,
                    placeOfBirth: reformer.birthPlace
                        ? {
                            name: reformer.birthPlace.name,
                            url: `${API_URL}location/${reformer.birthPlace.id}`,
                        }
                        : null,
                    placeOfDeath: reformer.deathPlace
                        ? {
                            name: reformer.deathPlace.name,
                            url: `${API_URL}location/${reformer.deathPlace.id}`,
                        }
                        : null,
                })),
            };

            // throw new Error("Simulated server error for testing.");


            await client.setEx(cacheKey, 60, JSON.stringify(transformedData));
            res.status(200).json(transformedData);

        } catch (error) {
            next(error);
        }

    }

    async store(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let imageId: number | null = null;
            if (req.file) {
                const newImage = Image.create({
                    url: `${IMAGE_URL}${req.file.filename}`,
                });
                await Image.save(newImage);
                imageId = newImage.id;
            }

            const reformerData = {
                ...req.body,
                imageId,
            };

            const newReformer = await reformerService.store(reformerData);
            res.status(201).json(newReformer);
        } catch (error) {
            next(error);
        }
    }

    async show(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;

        try {
            const ids = id.split(",").map(Number);
            const cachedData = await client.get(`reformers:${id}`);
            if (cachedData) {
                res.status(200).json(JSON.parse(cachedData));
                return;
            }

            const data = await reformerService.show(ids);

            await client.setEx(`reformers:${id}`, 60, JSON.stringify(data));
            res.status(200).json(data);


        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const reformerId = parseInt(id, 10);

            if (isNaN(reformerId)) {
                res.status(400).json({ message: "Invalid Reformer ID" });
            }

            let imageId: number | null = null;

            if (req.file) {
                const newImage = Image.create({
                    url: `${IMAGE_URL}${req.file.filename}`,
                });
                await Image.save(newImage);
                imageId = newImage.id;
            }

            const reformerData = {
                ...req.body,
                imageId,
            };

            const updatedReformer = await reformerService.update(reformerId, reformerData);

            if (!updatedReformer) {
                res.status(404).json({ message: "Reformer not found" });
            }

            res.status(200).json(updatedReformer);
        } catch (error) {
            next(error);
        }
    }

    async destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const reformerId = parseInt(id, 10);

            if (isNaN(reformerId)) {
                res.status(400).json({ message: "Invalid Reformer ID" });
            }

            const deleted = await reformerService.destroy(reformerId);

            if (!deleted) {
                res.status(404).json({ message: "Reformer not found" });
            }

            res.status(200).json({ message: "Reformer deleted successfully" });
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