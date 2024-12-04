"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reformer = void 0;
const typeorm_1 = require("typeorm");
const location_model_1 = require("./location.model");
let Reformer = class Reformer extends typeorm_1.BaseEntity {
};
exports.Reformer = Reformer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Reformer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Reformer.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Reformer.prototype, "born", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Reformer.prototype, "died", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Reformer.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Reformer.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Reformer.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => location_model_1.Location, (location) => location.reformersBornHere),
    (0, typeorm_1.JoinColumn)({ name: 'placeOfBirth' }),
    __metadata("design:type", location_model_1.Location)
], Reformer.prototype, "placeOfBirth", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => location_model_1.Location, (location) => location.reformersDiedHere),
    (0, typeorm_1.JoinColumn)({ name: 'placeOfDeath' }),
    __metadata("design:type", location_model_1.Location)
], Reformer.prototype, "placeOfDeath", void 0);
exports.Reformer = Reformer = __decorate([
    (0, typeorm_1.Entity)('reformers')
], Reformer);
