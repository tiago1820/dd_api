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
const reformer_service_1 = __importDefault(require("../services/reformer.service"));
class ReformersController {
    index(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cachedReformers = yield index_1.client.get('reformers');
                if (cachedReformers) {
                    res.status(200).json(JSON.parse(cachedReformers));
                    return;
                }
                const data = yield reformer_service_1.default.index();
                if (data.length === 0) {
                    res.status(200).json({ message: "No reformers found." });
                    return;
                }
                yield index_1.client.setEx('reformers', 60, JSON.stringify(data));
                res.status(200).json(data);
            }
            catch (error) {
                next(error);
            }
        });
    }
    store(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const reformerData = Object.assign(Object.assign({}, req.body), { image: `http://localhost:3001/files/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}` });
                const data = yield reformer_service_1.default.store(reformerData);
                res.status(201).json(data);
            }
            catch (error) {
                console.log("AQUI: ", error);
                next(error);
            }
        });
    }
    show(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield reformer_service_1.default.show(Number(id));
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
                const reformerData = Object.assign(Object.assign({}, req.body), (req.file && { image: `http://localhost:3001/files/${req.file.filename}` }));
                const data = yield reformer_service_1.default.update(Number(id), reformerData);
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
                const message = yield reformer_service_1.default.destroy(Number(id));
                res.status(200).json({ message });
            }
            catch (error) {
                next(error);
            }
        });
    }
    setPlaceOfBirth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { location_id, reformer_id } = req.body;
            try {
                const data = yield reformer_service_1.default.setPlaceOfBirth(Number(reformer_id), Number(location_id));
                res.status(200).json(data);
            }
            catch (error) {
                next(error);
            }
        });
    }
    setPlaceOfDeath(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { location_id, reformer_id } = req.body;
            try {
                const data = yield reformer_service_1.default.setPlaceOfDeath(Number(reformer_id), Number(location_id));
                res.status(200).json(data);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new ReformersController();
