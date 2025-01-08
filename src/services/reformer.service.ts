import { Like, In } from "typeorm";
import { Reformer } from '../models/reformer.model';
import { Location } from '../models/location.model';

export interface ReformerType {
    name: string;
    born: string;
    died: string;
    contribution?: string;
    imageId?: number;  
    birthPlaceId?: number;  
    deathPlaceId?: number;
}

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


    async update(id: number, body: ReformerType) {
        // try {
        //     if (!Object.keys(body).length) {
        //         throw new Error("No update values provided.");
        //     }

        //     const reformer = await Reformer.findOneBy({ id });
        //     if (!reformer) {
        //         throw new Error('Reformer not found.');
        //     }
        //     await Reformer.update({ id }, body);
        //     return { ...reformer, ...body };
        // } catch (error) {
        //     throw new Error('Error editing reformer in database');
        // }
    }

    async destroy(id: number) {
        // try {
        //     const reformer = await Reformer.findOneBy({ id });
        //     if (!reformer) {
        //         throw new Error('Reformer not found.');
        //     }
        //     await Reformer.remove(reformer);
        //     return `Reformer ${reformer.name} was deleted successfuly.`
        // } catch (error) {
        //     throw new Error('Error deleting a reformer in the database');
        // }
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