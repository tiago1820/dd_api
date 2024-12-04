"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const reformer_model_1 = require("../models/reformer.model");
const location_model_1 = require("../models/location.model");
class ReformerService {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield reformer_model_1.Reformer.createQueryBuilder('reformer')
                    .leftJoinAndSelect('reformer.placeOfBirth', 'placeOfBirth')
                    .leftJoinAndSelect('reformer.placeOfDeath', 'placeOfDeath')
                    .select([
                    'reformer',
                    'placeOfBirth.id',
                    'placeOfBirth.name',
                    'placeOfDeath.id',
                    'placeOfDeath.name'
                ])
                    .getMany();
                return data;
            }
            catch (error) {
                throw new Error("Error retrieving reformers from the database");
            }
        });
    }
    store(reformer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newReformer = reformer_model_1.Reformer.create(reformer);
                yield newReformer.save();
                return newReformer;
            }
            catch (error) {
                throw new Error("Error saving the reformer to the database");
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield reformer_model_1.Reformer.createQueryBuilder('reformer')
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
            }
            catch (error) {
                throw new Error(`Error retrieving Reformer with id ${id} from database`);
            }
        });
    }
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!Object.keys(body).length) {
                    throw new Error("No update values provided.");
                }
                const reformer = yield reformer_model_1.Reformer.findOneBy({ id });
                if (!reformer) {
                    throw new Error('Reformer not found.');
                }
                yield reformer_model_1.Reformer.update({ id }, body);
                return Object.assign(Object.assign({}, reformer), body);
            }
            catch (error) {
                console.log("Holy Holy Holy ", error);
                throw new Error('Error editing reformer in database');
            }
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reformer = yield reformer_model_1.Reformer.findOneBy({ id });
                if (!reformer) {
                    throw new Error('Reformer not found.');
                }
                yield reformer_model_1.Reformer.remove(reformer);
                return `Reformer ${reformer.name} was deleted successfuly.`;
            }
            catch (error) {
                throw new Error('Error deleting a reformer in the database');
            }
        });
    }
    setPlaceOfBirth(reformer_id, location_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const location = yield location_model_1.Location.findOne({
                    where: { id: Number(location_id) },
                    select: ['id', 'name']
                });
                if (!location) {
                    throw new Error('Location not found.');
                }
                const reformer = yield reformer_model_1.Reformer.findOne({
                    where: { id: reformer_id },
                    relations: ['placeOfBirth']
                });
                if (!reformer) {
                    throw new Error('Reformer not found.');
                }
                reformer.placeOfBirth = location;
                yield reformer_model_1.Reformer.save(reformer);
                const data = yield reformer_model_1.Reformer.createQueryBuilder('reformer')
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
            }
            catch (error) {
                throw new Error('Error associating the location with the reformer.');
            }
        });
    }
    setPlaceOfDeath(reformer_id, location_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const location = yield location_model_1.Location.findOne({
                    where: { id: Number(location_id) },
                    select: ['id', 'name']
                });
                if (!location) {
                    throw new Error('Location not found.');
                }
                const reformer = yield reformer_model_1.Reformer.findOne({
                    where: { id: reformer_id },
                    relations: ['placeOfDeath']
                });
                if (!reformer) {
                    throw new Error('Reformer not found.');
                }
                reformer.placeOfDeath = location;
                yield reformer_model_1.Reformer.save(reformer);
                const data = yield reformer_model_1.Reformer.createQueryBuilder('reformer')
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
            }
            catch (error) {
                throw new Error('Error associating the location with the reformer.');
            }
        });
    }
}
exports.default = new ReformerService();
