import { ILike } from 'typeorm';
import { Location } from '../models/location.model';

interface LocationType {
    name: string;
}

class LocationService {

    async index(page: number, limit: number) {
        try {
            const [data, total] = await Location.findAndCount({
                relations: ["birthReformers", "deathReformers"],
                skip: (page - 1) * limit,
                take: limit,
            });

            const pages = Math.ceil(total / limit);

            const results = data.map(location => ({
                id: location.id,
                name: location.name,
                reformersBornHere: [
                    ...location.birthReformers.map(reformer => `http://localhost:3001/api/reformer/${reformer.id}`),
                ],
                reformersDiedHere: [
                    ...location.deathReformers.map(reformer => `http://localhost:3001/api/reformer/${reformer.id}`),
                ],
                created: location.createdAt.toISOString(),
            }));

            return {
                info: {
                    count: total,
                    pages,
                    next: page < pages ? `http://localhost:3001/api/location?page=${page + 1}` : null,
                    prev: page > 1 ? `http://localhost:3001/api/location?page=${page - 1}` : null,
                },
                results,
            };

        } catch (error) {
            throw new Error("Error retrieving locations from the database");
        }
    }

    async store(location: LocationType) {
        // try {
        //     const newLocation = Location.create(location);
        //     await newLocation.save();
        //     return newLocation;
        // } catch (error) {
        //     console.log("AQUI: ", error);

        //     throw new Error("Error saving the location to the database");
        // }
    }

    async show(ids: number[]) {
        try {
            const data = await Location.find({
                where: ids.map(id => ({ id })),
                relations: ["birthReformers", "deathReformers"],
            });

            if (data.length === 0) {
                throw new Error(`Location(s) with ID(s) ${ids.join(", ")} not found.`);
            }

            return data.map(location => ({
                id: location.id,
                name: location.name,
                reformersBornHere: location.birthReformers.map(reformer => `http://localhost:3001/api/reformer/${reformer.id}`),
                reformersDiedHere: location.deathReformers.map(reformer => `http://localhost:3001/api/reformer/${reformer.id}`),
                created: location.createdAt.toISOString(),
            }));
        } catch (error) {
            throw new Error(`Error retrieving location(s) with ID(s) ${ids.join(", ")}`);
        }
    }


    async update(id: number, body: LocationType) {
        // try {
        //     const location = await Location.findOneBy({ id });
        //     if (!location) {
        //         throw new Error('Location not found.');
        //     }
        //     await Location.update({ id }, body);
        //     return { ...location, ...body };
        // } catch (error) {
        //     throw new Error('Error editing location in database');
        // }
    }

    async destroy(id: number) {
        // try {
        //     const location = await Location.findOneBy({ id });
        //     if (!location) {
        //         throw new Error('Reformer not found.');
        //     }
        //     await Location.remove(location);
        //     return `Location ${location.name} was deleted successfuly.`
        // } catch (error) {
        //     throw new Error('Error deleting a location in the database');
        // }
    }

    async filterByName(names: string[]) {
        // try {
        //     const data = await Location.find({
        //         where: names.map(name => ({ name: ILike(`%${name}%`) })),
        //         relations: ["reformersBornHere", "reformersDiedHere"],
        //     });

        //     if (data.length === 0) {
        //         throw new Error(`No locations found for names: ${names.join(", ")} `);
        //     }

        //     return data.map(location => ({
        //         id: location.id,
        //         name: location.name,
        //         reformersBornHere: location.reformersBornHere.map(reformer => `http://localhost:3001/api/reformer/${reformer.id}`),
        //         reformersDiedHere: location.reformersDiedHere.map(reformer => `http://localhost:3001/api/reformer/${reformer.id}`),
        //         created: location.createdAt.toISOString(),
        //     }));
        // } catch (error) {
        //     throw new Error(`Error retrieving locations with names: ${names.join(", ")} from database`);
        // }
    }

}

export default new LocationService();