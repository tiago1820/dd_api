import { Request, Response } from "express";
import { Character } from '../models/characterModel';

class CharactersController {
    constructor() { }

    async index(req: Request, res: Response) {
        try {
            const data = await Character.find();
            res.status(200).json(data);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    async store(req: Request, res: Response) {
        try {
            const data = await Character.save(req.body);
            res.status(201).json(data);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await Character.findOneBy({ id: Number(id) });
            if (!data) {
                throw new Error('Character not found.');
            }
            res.status(200).json(data);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const result = await Character.findOneBy({ id: Number(id) });
            if (!result) {
                throw new Error('Character not found.');
            }
            await Character.update({ id: Number(id) }, req.body);
            const data = await Character.findOneBy({ id: Number(id) });
            res.status(200).json(data);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

    async destroy(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const result = await Character.findOneBy({ id: Number(id) });
            if (!result) {
                throw new Error('Character not found.');
            }
            await Character.delete({ id: Number(id) });
            res.status(200).json({message: `Character ${result.name} was deleted successfully.`})
        } catch (error) {
            if (error instanceof Error)
                res.status(500).send(error.message);
        }
    }

}

export default new CharactersController();