import { Location } from '../models/location.model';

interface LocationType {
    name: string;
}

class LocationService {

    async index() {
        try {
            const data = await Location.find();
            return data;
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