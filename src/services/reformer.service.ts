import { Reformer } from '../models/reformer.model';
import { Location } from '../models/location.model';

interface ReformerType {
    name: string;
    born: string;
    died: string;
    image: string;
    url: string;
}

class ReformerService {

    async index(page: number, limit: number) {
        try {
            const offset = (page - 1) * limit;
            
            const [data, total] = await Reformer.createQueryBuilder('reformer')
                .leftJoinAndSelect('reformer.placeOfBirth', 'placeOfBirth')
                .leftJoinAndSelect('reformer.placeOfDeath', 'placeOfDeath')
                .select([
                    'reformer',
                    'placeOfBirth.id',
                    'placeOfBirth.name',
                    'placeOfDeath.id',
                    'placeOfDeath.name'
                ])
                .skip(offset)
                .take(limit)
                .getManyAndCount();

            return { data, total };
        } catch (error) {
            throw new Error("Error retrieving reformers from the database");
        }
    }

    async store(reformer: ReformerType) {
        try {
            const newReformer = Reformer.create(reformer);
            await newReformer.save();
            return newReformer;
        } catch (error) {
            throw new Error("Error saving the reformer to the database");
        }
    }

    async show(id: number) {
        try {
            const data = await Reformer.createQueryBuilder('reformer')
                .leftJoinAndSelect('reformer.placeOfBirth', 'placeOfBirth')
                .leftJoinAndSelect('reformer.placeOfDeath', 'placeOfDeath')
                .where('reformer.id = :id', { id })
                .select([
                    'reformer',
                    'placeOfBirth.id',
                    'placeOfBirth.name',
                    'placeOfDeath.id',
                    'placeOfDeath.name'
                ])
                .getOne();

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
            if (!Object.keys(body).length) {
                throw new Error("No update values provided.");
            }

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
            throw new Error('Error deleting a reformer in the database');
        }
    }

    async setPlaceOfBirth(reformer_id: number, location_id: number) {
        try {
            const location = await Location.findOne({
                where: { id: Number(location_id) },
                select: ['id', 'name']
            });

            if (!location) {
                throw new Error('Location not found.');
            }

            const reformer = await Reformer.findOne({
                where: { id: reformer_id },
                relations: ['placeOfBirth']
            });

            if (!reformer) {
                throw new Error('Reformer not found.');
            }

            reformer.placeOfBirth = location;
            await Reformer.save(reformer);

            const data = await Reformer.createQueryBuilder('reformer')
                .leftJoinAndSelect('reformer.placeOfBirth', 'placeOfBirth')
                .leftJoinAndSelect('reformer.placeOfDeath', 'placeOfDeath')
                .where('reformer.id = :id', { id: reformer_id })
                .select([
                    'reformer',
                    'placeOfBirth.id',
                    'placeOfBirth.name',
                    'placeOfDeath.id',
                    'placeOfDeath.name'
                ])
                .getOne();

            return data;
        } catch (error) {
            throw new Error('Error associating the location with the reformer.');
        }
    }

    async setPlaceOfDeath(reformer_id: number, location_id: number) {
        try {
            const location = await Location.findOne({
                where: { id: Number(location_id) },
                select: ['id', 'name']
            });

            if (!location) {
                throw new Error('Location not found.');
            }

            const reformer = await Reformer.findOne({
                where: { id: reformer_id },
                relations: ['placeOfDeath']
            });

            if (!reformer) {
                throw new Error('Reformer not found.');
            }

            reformer.placeOfDeath = location;
            await Reformer.save(reformer);

            const data = await Reformer.createQueryBuilder('reformer')
                .leftJoinAndSelect('reformer.placeOfBirth', 'placeOfBirth')
                .leftJoinAndSelect('reformer.placeOfDeath', 'placeOfDeath')
                .where('reformer.id = :id', { id: reformer_id })
                .select([
                    'reformer',
                    'placeOfBirth.id',
                    'placeOfBirth.name',
                    'placeOfDeath.id',
                    'placeOfDeath.name'
                ])
                .getOne();

            return data;
        } catch (error) {
            throw new Error('Error associating the location with the reformer.');
        }
    }

}

export default new ReformerService();