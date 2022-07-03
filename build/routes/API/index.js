"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_routes_1 = __importDefault(require("./users.routes"));
const sites_routes_1 = __importDefault(require("./sites.routes"));
const app = (0, express_1.default)();
app.use('/users', users_routes_1.default);
app.use('/sites', sites_routes_1.default);
exports.default = app;
