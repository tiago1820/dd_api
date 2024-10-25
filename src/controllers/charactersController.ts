import { Request, Response, NextFunction } from "express";
import { Character } from '../models/characterModel';
import characterService from "../services/characterService";

class CharactersController {

    async index(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = await characterService.index();
            if (data.length === 0) {
                res.status(200).json({ message: "No characters found." });
            }
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    async store(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = await characterService.store(req.body);
            res.status(201).json(data);
        } catch (error) {
            next(error);
        }
    }

    async show(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        try {
            const data = await characterService.show(Number(id));
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        try {
            const data = await characterService.update(Number(id), req.body);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    async destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        try {
            const message = await characterService.destroy(Number(id));
            res.status(200).json({ message });
        } catch (error) {
            next(error);
        }
    }

}

export default new CharactersController();