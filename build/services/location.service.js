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
const location_model_1 = require("../models/location.model");
class LocationService {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield location_model_1.Location.find();
                return data;
            }
            catch (error) {
                throw new Error("Error retrieving locations from the database");
            }
        });
    }
    store(location) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newLocation = location_model_1.Location.create(location);
                yield newLocation.save();
                return newLocation;
            }
            catch (error) {
                throw new Error("Error saving the location to the database");
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield location_model_1.Location.findOneBy({ id });
                if (!data) {
                    throw new Error(`Location with id ${id} not found.`);
                }
                return data;
            }
            catch (error) {
                throw new Error(`Error retrieving location with id ${id} from database`);
            }
        });
    }
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const location = yield location_model_1.Location.findOneBy({ id });
                if (!location) {
                    throw new Error('Location not found.');
                }
                yield location_model_1.Location.update({ id }, body);
                return Object.assign(Object.assign({}, location), body);
            }
            catch (error) {
                throw new Error('Error editing location in database');
            }
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const location = yield location_model_1.Location.findOneBy({ id });
                if (!location) {
                    throw new Error('Reformer not found.');
                }
                yield location_model_1.Location.remove(location);
                return `Location ${location.name} was deleted successfuly.`;
            }
            catch (error) {
                throw new Error('Error deleting a location in the database');
            }
        });
    }
}
exports.default = new LocationService();
