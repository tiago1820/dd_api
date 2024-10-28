import { Episode } from '../models/episode.model';

interface EpisodeType {
    name: string;
    air_date: string;
    episode_code: string;
    url: string;
}

class EpisodeService {

    async index() {
        try {
            const data = await Episode.find();
            return data;
        } catch (error) {
            throw new Error("Error retrieving episodes from the database");
        }
    }

    async store(episode: EpisodeType) {
        try {
            const newEpisode = Episode.create(episode);
            await newEpisode.save();
            return newEpisode;
        } catch (error) {
            throw new Error("Error saving the episode to the database");
        }
    }

    async show(id: number) {
        try {
            const data = await Episode.findOneBy({ id });
            if (!data) {
                throw new Error(`Episode with id ${id} not found.`);
            }
            return data;
        } catch (error) {
            throw new Error(`Error retrieving episode with id ${id} from database`)
        }
    }

    async update(id: number, body: EpisodeType) {
        try {
            const episode = await Episode.findOneBy({ id });
            if (!episode) {
                throw new Error('Episode not found.');
            }
            await Episode.update({ id }, body);
            return { ...episode, ...body };
        } catch (error) {
            throw new Error('Error editing episode in database');
        }
    }

    async destroy(id: number) {
        try {
            const episode = await Episode.findOneBy({ id });
            if (!episode) {
                throw new Error('Character not found.');
            }
            await Episode.remove(episode);
            return `Episode ${episode.name} was deleted successfuly.`
        } catch (error) {
            throw new Error('Error deleting a episode in the database');
        }
    }

}

export default new EpisodeService();