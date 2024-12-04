"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reformers_controller_1 = __importDefault(require("../controllers/reformers.controller"));
const router = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
const multer_config_1 = require("../multer-config");
const upload = (0, multer_1.default)({ storage: multer_config_1.storage });
router.get('/', reformers_controller_1.default.index);
router.post('/', upload.single('file'), reformers_controller_1.default.store);
router.post('/dateofbirth', reformers_controller_1.default.setPlaceOfBirth);
router.post('/dateofdeath', reformers_controller_1.default.setPlaceOfDeath);
router.route('/:id')
    .get(reformers_controller_1.default.show)
    .put(upload.single('file'), reformers_controller_1.default.update)
    .delete(reformers_controller_1.default.destroy);
exports.default = router;
