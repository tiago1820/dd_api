import { ILike } from 'typeorm';
import { Location } from '../models/location.model';
import { LocationType } from '../interfaces/location.interface';

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
        try {
            const newLocation = Location.create({
                name: location.name,
            });

            await newLocation.save();

            return {
                id: newLocation.id,
                name: newLocation.name,
                createdAt: newLocation.createdAt.toISOString(),
            };
        } catch (error) {
            throw new Error("Error saving the location to the database");
        }
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

    async update(id: number, body: Partial<LocationType>) {
        try {
            const location = await Location.findOne({ where: { id } });
            if (!location) {
                throw new Error(`Location with ID ${id} not found.`);
            }

            if (body.name && (typeof body.name !== "string" || body.name.trim() === "")) {
                throw new Error("Location name must be a non-empty string.");
            }

            await Location.update({ id }, body);

            const updatedLocation = await Location.findOne({ where: { id } });

            return updatedLocation;
        } catch (error) {
            throw new Error("Error updating location in the database");
        }
    }

    async destroy(id: number): Promise<string> {
        try {
            const location = await Location.findOne({
                where: { id },
                relations: ["birthReformers", "deathReformers"],
            });

            if (!location) {
                throw new Error("Location not found.");
            }

            if (location.birthReformers.length > 0 || location.deathReformers.length > 0) {
                throw new Error(
                    `Location "${location.name}" cannot be deleted because it is associated with reformers.`
                );
            }

            await Location.remove(location);
            return `Location "${location.name}" was deleted successfully.`;
        } catch (error) {
            throw new Error(`Error deleting location.`);
        }
    }

    async filterByName(names: string[]): Promise<any[]> {
        try {
            if (!Array.isArray(names) || names.length === 0) {
                throw new Error("The 'names' parameter must be a non-empty array of strings.");
            }

            const data = await Location.find({
                where: names.map(name => ({ name: ILike(`%${name}%`) })),
                relations: ["birthReformers", "deathReformers"],
            });

            if (data.length === 0) {
                throw new Error(`No locations found for names: ${names.join(", ")}.`);
            }

            return data.map(location => ({
                id: location.id,
                name: location.name,
                reformersBornHere: location.birthReformers.map(reformer =>
                    `http://localhost:3001/api/reformer/${reformer.id}`
                ),
                reformersDiedHere: location.deathReformers.map(reformer =>
                    `http://localhost:3001/api/reformer/${reformer.id}`
                ),
                created: location.createdAt.toISOString(),
            }));
        } catch (error) {
            throw new Error(
                `Error retrieving locations with names: ${names.join(", ")}.`
            );
        }
    }
}

export default new LocationService();