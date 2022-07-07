"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, config_1.default.token.secret, (err, user) => {
        if (err)
            return res.json({
                ok: false,
                msg: "Ha ocurrido un error con su token",
                error: err
            }).status(403);
        req.user = user;
        next();
        return;
    });
    return;
}
exports.authenticateToken = authenticateToken;
