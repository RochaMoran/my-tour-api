"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/API/index"));
const index_2 = __importDefault(require("./config/index"));
const logging_1 = __importDefault(require("./config/logging"));
const body_parser_1 = __importDefault(require("body-parser"));
require("./database");
// import express, { Router } from 'express' => ESModules
// const express = require('express) => CommonJs
const app = (0, express_1.default)();
//Middleware for transform req.body to json
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/api', index_1.default);
app.listen(index_2.default.server.port, () => {
    logging_1.default.info('SERVER', `Server running on ${index_2.default.server.hostname}:${index_2.default.server.port}`);
});
