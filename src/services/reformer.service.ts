import { Like, In } from "typeorm";
import { Reformer } from '../models/reformer.model';
import { Location } from '../models/location.model';
import { Image } from "../models/image.model";
import { ReformerType } from "../interfaces/reformer.interface";

class ReformerService {

    async index(page: number, limit: number): Promise<{ data: Reformer[]; total: number }> {
        try {
            const offset = (page - 1) * limit;

            const [data, total] = await Reformer.findAndCount({
                relations: ['birthPlace', 'deathPlace', 'image'],
                skip: offset,
                take: limit,
                select: {
                    id: true,
                    name: true,
                    born: true,
                    died: true,
                    contribution: true,
                    createdAt: true,
                    birthPlace: {
                        id: true,
                        name: true,
                    },
                    deathPlace: {
                        id: true,
                        name: true,
                    },
                    image: {
                        id: true,
                        url: true,
                    },
                },
            });

            return { data, total };

        } catch (error) {
            throw new Error("Error retrieving reformers from the database");
        }

    }

    async store(reformer: ReformerType): Promise<Reformer> {
        const newReformer = Reformer.create({
            name: reformer.name,
            born: reformer.born,
            died: reformer.died,
            contribution: reformer.contribution,
            image: reformer.imageId ? { id: reformer.imageId } : undefined,
            birthPlace: reformer.birthPlaceId ? { id: reformer.birthPlaceId } : null,
            deathPlace: reformer.deathPlaceId ? { id: reformer.deathPlaceId } : null,
        });

        await Reformer.save(newReformer);
        return newReformer;
    }

    async show(ids: number[]) {
        try {
            const data = await Reformer.find({
                where: { id: In(ids) },
                relations: ['birthPlace', 'deathPlace', 'image'],
                select: {
                    id: true,
                    name: true,
                    born: true,
                    died: true,
                    contribution: true,
                    createdAt: true,
                    birthPlace: {
                        id: true,
                        name: true,
                    },
                    deathPlace: {
                        id: true,
                        name: true,
                    },
                    image: {
                        id: true,
                        url: true,
                    },
                },
            });

            if (!data.length) {
                throw new Error(`No reformers found for the given IDs.`);
            }

            return data;
        } catch (error) {
            throw new Error(`Error retrieving reformers by IDs.`);
        }

    }

    async update(id: number, body: ReformerType): Promise<Reformer | null> {
        const reformer = await Reformer.findOne({
            where: { id },
            relations: ["image", "birthPlace", "deathPlace"],
        });

        if (!reformer) {
            return null;
        }

        reformer.name = body.name ?? reformer.name;
        reformer.born = body.born ?? reformer.born;
        reformer.died = body.died ?? reformer.died;
        reformer.contribution = body.contribution ?? reformer.contribution;

        if (body.imageId) {
            reformer.image = await Image.findOne({ where: { id: body.imageId } }) ?? undefined;
        }

        if (body.birthPlaceId) {
            reformer.birthPlace = await Location.findOne({ where: { id: body.birthPlaceId } }) ?? null;
        }

        if (body.deathPlaceId) {
            reformer.deathPlace = await Location.findOne({ where: { id: body.deathPlaceId } }) ?? null;
        }

        await Reformer.save(reformer);

        return reformer;
    }

    async destroy(id: number): Promise<boolean> {
        const reformer = await Reformer.findOne({
            where: { id },
            relations: ["image"],
        });

        if (!reformer) {
            return false;
        }

        if (reformer.image) {
            await Image.delete(reformer.image.id);
        }

        await Reformer.remove(reformer);

        return true;
    }

    async setPlaceOfBirth(reformer_id: number, location_id: number) {
        try {
            const location = await Location.findOne({
                where: { id: location_id },
            });

            if (!location) {
                throw new Error('Location not found.');
            }

            const reformer = await Reformer.findOne({
                where: { id: reformer_id },
                relations: ['birthPlace', 'deathPlace'],
            });

            if (!reformer) {
                throw new Error('Reformer not found.');
            }

            reformer.birthPlace = location;

            await reformer.save();

            const updatedReformer = await Reformer.findOne({
                where: { id: reformer_id },
                relations: ['birthPlace', 'deathPlace'],
                select: {
                    id: true,
                    name: true,
                    birthPlace: {
                        id: true,
                        name: true,
                    },
                    deathPlace: {
                        id: true,
                        name: true,
                    },
                },
            });

            if (!updatedReformer) {
                throw new Error('Failed to fetch updated reformer.');
            }

            return updatedReformer;
        } catch (error) {
            throw new Error(`Error associating the location with the reformer.`);
        }
    }

    async setPlaceOfDeath(reformer_id: number, location_id: number) {
        try {
            const location = await Location.findOne({
                where: { id: location_id },
            });

            if (!location) {
                throw new Error('Location not found.');
            }

            const reformer = await Reformer.findOne({
                where: { id: reformer_id },
                relations: ['birthPlace', 'deathPlace'],
            });

            if (!reformer) {
                throw new Error('Reformer not found.');
            }

            reformer.deathPlace = location;

            await reformer.save();

            const updatedReformer = await Reformer.findOne({
                where: { id: reformer_id },
                relations: ['birthPlace', 'deathPlace'],
                select: {
                    id: true,
                    name: true,
                    birthPlace: {
                        id: true,
                        name: true,
                    },
                    deathPlace: {
                        id: true,
                        name: true,
                    },
                },
            });

            if (!updatedReformer) {
                throw new Error('Failed to fetch updated reformer.');
            }

            return updatedReformer;
        } catch (error) {
            throw new Error(`Error associating the location with the reformer.`);
        }
    }

    async filterByName(names: string[]): Promise<Reformer[] | { message: string }> {
        try {
            const nameFilters = names.map(name => ({ name: Like(`%${name}%`) }));

            const data = await Reformer.find({
                where: nameFilters,
                relations: ['birthPlace', 'deathPlace', 'image'],
                select: {
                    id: true,
                    name: true,
                    born: true,
                    died: true,
                    contribution: true,
                    createdAt: true,
                    birthPlace: {
                        id: true,
                        name: true,
                    },
                    deathPlace: {
                        id: true,
                        name: true,
                    },
                    image: {
                        id: true,
                        url: true,
                    },
                },
            });

            if (data.length === 0) {
                return { message: "No reformers found with the given names." };
            }

            return data;

        } catch (error) {
            throw new Error('Error filtering reformers by name.');
        }

    }

}

export default new ReformerService();