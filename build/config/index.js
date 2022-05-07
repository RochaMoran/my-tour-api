"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const MONGO_OPTIONS = {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DATABASE = process.env.MONGO_DATABASE;
const MONGO_URL = process.env.MONGO_URL || `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.ruh0x.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`;
const MONGO = {
    options: MONGO_OPTIONS,
    url: MONGO_URL
};
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 5500;
const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};
const config = {
    mongo: MONGO,
    server: SERVER
};
exports.default = config;
