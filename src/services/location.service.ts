import { Location } from '../models/location.model';

interface LocationType {
    name: string;
}

class LocationService {

    async index(page: number, limit: number) {
        try {
            const [data, total] = await Location.findAndCount({
                relations: ["reformersBornHere", "reformersDiedHere"],
                skip: (page - 1) * limit,
                take: limit,
            });

            const pages = Math.ceil(total / limit);

            const results = data.map(location => ({
                id: location.id,
                name: location.name,
                reformersBornHere: [
                    ...location.reformersBornHere.map(reformer => `http://localhost:3001/api/reformer/${reformer.id}`),
                ],
                reformersDiedHere: [
                    ...location.reformersDiedHere.map(reformer => `http://localhost:3001/api/reformer/${reformer.id}`),
                ],
                created: location.createdAt.toISOString(),
            }));

            return {
                info: {
                    count: total, pages,
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
            const newLocation = Location.create(location);
            await newLocation.save();
            return newLocation;
        } catch (error) {
            throw new Error("Error saving the location to the database");
        }
    }

    async show(id: number) {
        try {
            const data = await Location.findOneBy({ id });
            if (!data) {
                throw new Error(`Location with id ${id} not found.`);
            }
            return data;
        } catch (error) {
            throw new Error(`Error retrieving location with id ${id} from database`)
        }
    }

    async update(id: number, body: LocationType) {
        try {
            const location = await Location.findOneBy({ id });
            if (!location) {
                throw new Error('Location not found.');
            }
            await Location.update({ id }, body);
            return { ...location, ...body };
        } catch (error) {
            throw new Error('Error editing location in database');
        }
    }

    async destroy(id: number) {
        try {
            const location = await Location.findOneBy({ id });
            if (!location) {
                throw new Error('Reformer not found.');
            }
            await Location.remove(location);
            return `Location ${location.name} was deleted successfuly.`
        } catch (error) {
            throw new Error('Error deleting a location in the database');
        }
    }

}

export default new LocationService();