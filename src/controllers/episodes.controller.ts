import { Request, Response, NextFunction } from "express";
import { client } from '../index';
import episodeService from "../services/episode.service";

class EpisodeController {

    async index(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const cachedEpisodes = await client.get('episodes');
            if (cachedEpisodes) {
                res.status(200).json(JSON.parse(cachedEpisodes));
                return;
            }

            const data = await episodeService.index();
            if (data.length === 0) {
                res.status(200).json({ message: "No episodes found." });
                return;
            }

            await client.setEx('episodes', 60, JSON.stringify(data));
            res.status(200).json(data);
            
        } catch (error) {
            next(error);
        }
    }

    async store(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = await episodeService.store(req.body);
            res.status(201).json(data);
        } catch (error) {            
            next(error);
        }
    }

    async show(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        try {
            const data = await episodeService.show(Number(id));
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        try {
            const data = await episodeService.update(Number(id), req.body);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    async destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        try {
            const message = await episodeService.destroy(Number(id));
            res.status(200).json({ message });
        } catch (error) {
            next(error);
        }
    }

}

export default new EpisodeController();