import { Character } from '../models/characterModel';

interface CharacterType {
    name: string;
    status: string;
    species: string;
    gender: string;
    image: string;
    episode: string;
    url: string;
}

class CharacterService {

    async index() {
        try {
            const data = await Character.find();
            return data;
        } catch (error) {
            throw new Error("Error retrieving characters from the database");
        }
    }

    async store(character: CharacterType) {
        try {
            const newCharacter = Character.create(character);
            await newCharacter.save();
            return newCharacter;
        } catch (error) {
            throw new Error("Error saving the character to the database");
        }
    }

    async show(id: number) {
        try {
            const data = await Character.findOneBy({ id });
            if (!data) {
                throw new Error(`Character with id ${id} not found.`);
            }
            return data;
        } catch (error) {
            throw new Error(`Error retrieving character with id ${id} from database`)
        }
    }

    async update(id: number, body: CharacterType) {
        try {
            const character = await Character.findOneBy({ id });
            if (!character) {
                throw new Error('Character not found.');
            }
            await Character.update({ id }, body);
            return { ...character, ...body };
        } catch (error) {
            throw new Error('Error editing character in database');
        }
    }

    async destroy(id: number) {
        try {
            const character = await Character.findOneBy({ id });
            if (!character) {
                throw new Error('Character not found.');
            }
            await Character.remove(character);
            return `Character ${character.name} was deleted successfuly.`
        } catch (error) {
            throw new Error('Error deleting a character in the database');
        }
    }

}

export default new CharacterService();