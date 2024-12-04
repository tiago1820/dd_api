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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const location_service_1 = __importDefault(require("../services/location.service"));
class LocationController {
    index(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cachedLocations = yield index_1.client.get('locations');
                if (cachedLocations) {
                    res.status(200).json(JSON.parse(cachedLocations));
                    return;
                }
                const data = yield location_service_1.default.index();
                if (data.length === 0) {
                    res.status(200).json({ message: "No locations found." });
                    return;
                }
                yield index_1.client.setEx('locations', 60, JSON.stringify(data));
                res.status(200).json(data);
            }
            catch (error) {
                next(error);
            }
        });
    }
    store(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield location_service_1.default.store(req.body);
                res.status(201).json(data);
            }
            catch (error) {
                next(error);
            }
        });
    }
    show(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield location_service_1.default.show(Number(id));
                res.status(200).json(data);
            }
            catch (error) {
                next(error);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield location_service_1.default.update(Number(id), req.body);
                res.status(200).json(data);
            }
            catch (error) {
                next(error);
            }
        });
    }
    destroy(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const message = yield location_service_1.default.destroy(Number(id));
                res.status(200).json({ message });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new LocationController();
