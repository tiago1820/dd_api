"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const reformers_routes_1 = __importDefault(require("./routes/reformers.routes"));
const locations_routes_1 = __importDefault(require("./routes/locations.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.get('/api', (req, res) => {
    const data = {
        "reformers": "http://localhost:3000/api/reformers",
    };
    res.send(data);
});
app.use('/reformers', reformers_routes_1.default);
app.use('/locations', locations_routes_1.default);
app.use('/files', express_1.default.static('uploads'));
app.use((err, req, res, next) => {
    console.error(err);
    if (err instanceof Error) {
        res.status(500).json({ message: err.message, error: 'Internal server error' });
    }
    else {
        res.status(500).json({ message: 'Unknown error occurred', error: 'Internal server error' });
    }
});
exports.default = app;
