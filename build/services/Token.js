"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.verifyToken = void 0;
const config_1 = __importDefault(require("../config"));
const jwt = require("jsonwebtoken");
const verifyToken = (token) => {
    let data;
    if (token) {
        throw new Error("Se necesita el Token");
    }
    jwt.verify(token, config_1.default.token.secret, (err, decode) => {
        if (err) {
            throw new Error("Token no valido");
        }
        data = decode.user;
    });
    return data;
};
exports.verifyToken = verifyToken;
const generateToken = (user) => {
    const newToken = jwt.sign({ user }, config_1.default.token.secret);
    return newToken;
};
exports.generateToken = generateToken;
