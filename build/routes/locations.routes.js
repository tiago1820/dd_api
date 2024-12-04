"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const locations_controller_1 = __importDefault(require("../controllers/locations.controller"));
const router = express_1.default.Router();
router.get('/', locations_controller_1.default.index);
router.post('/', locations_controller_1.default.store);
router.route('/:id')
    .get(locations_controller_1.default.show)
    .put(locations_controller_1.default.update)
    .delete(locations_controller_1.default.destroy);
exports.default = router;
