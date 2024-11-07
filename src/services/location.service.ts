import { Location } from '../models/location.model';

interface LocationType {
    name: string;
    air_date: string;
    episode_code: string;
    url: string;
}

class LocationService {

    async index() {
        try {
            const data = await Location.find();
            return data;
        } catch (error) {
            throw new Error("Error retrieving episodes from the database");
        }
    }

    async store(episode: LocationType) {
        try {
            const newLocation = Location.create(episode);
            await newLocation.save();
            return newLocation;
        } catch (error) {
            throw new Error("Error saving the episode to the database");
        }
    }

    async show(id: number) {
        try {
            const data = await Location.findOneBy({ id });
            if (!data) {
                throw new Error(`Episode with id ${id} not found.`);
            }
            return data;
        } catch (error) {
            throw new Error(`Error retrieving episode with id ${id} from database`)
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
            throw new Error('Error editing episode in database');
        }
    }

    async destroy(id: number) {
        try {
            const location = await Location.findOneBy({ id });
            if (!location) {
                throw new Error('Reformer not found.');
            }
            await Location.remove(location);
            return `Episode ${location.name} was deleted successfuly.`
        } catch (error) {
            throw new Error('Error deleting a episode in the database');
        }
    }

}

export default new LocationService();