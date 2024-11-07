import { Reformer } from '../models/reformer.model';

interface ReformerType {
    name: string;
    status: string;
    species: string;
    gender: string;
    image: string;
    episode: string;
    url: string;
}

class ReformerService {

    async index() {
        try {
            const data = await Reformer.find();
            return data;
        } catch (error) {
            throw new Error("Error retrieving characters from the database");
        }
    }

    async store(reformer: ReformerType) {
        try {
            const newReformer = Reformer.create(reformer);
            await newReformer.save();
            return newReformer;
        } catch (error) {
            throw new Error("Error saving the character to the database");
        }
    }

    async show(id: number) {
        try {
            const data = await Reformer.findOneBy({ id });
            if (!data) {
                throw new Error(`Reformer with id ${id} not found.`);
            }
            return data;
        } catch (error) {
            throw new Error(`Error retrieving Reformer with id ${id} from database`)
        }
    }

    async update(id: number, body: ReformerType) {
        try {
            const reformer = await Reformer.findOneBy({ id });
            if (!reformer) {
                throw new Error('Reformer not found.');
            }
            await Reformer.update({ id }, body);
            return { ...reformer, ...body };
        } catch (error) {
            throw new Error('Error editing reformer in database');
        }
    }

    async destroy(id: number) {
        try {
            const reformer = await Reformer.findOneBy({ id });
            if (!reformer) {
                throw new Error('Reformer not found.');
            }
            await Reformer.remove(reformer);
            return `Reformer ${reformer.name} was deleted successfuly.`
        } catch (error) {
            throw new Error('Error deleting a character in the database');
        }
    }

}

export default new ReformerService();