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
exports.oauthGoogle = void 0;
const google_auth_library_1 = require("google-auth-library");
const Token_1 = require("../services/Token");
// import { Token } from "../../../services/Tokens"
const users_models_1 = __importDefault(require("../models/users.models"));
// import User  from "../../../models/user.models"
const client = new google_auth_library_1.OAuth2Client("466043510019-kubd3rqjjesnd07st5fh888smv05bqg9.apps.googleusercontent.com");
const googleVerify = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const ticket = yield client.verifyIdToken({
        idToken: token,
        audience: "466043510019-kubd3rqjjesnd07st5fh888smv05bqg9.apps.googleusercontent.com",
    });
    const payload = ticket.getPayload();
    return {
        username: payload === null || payload === void 0 ? void 0 : payload.name,
        email: payload === null || payload === void 0 ? void 0 : payload.email,
        img: payload === null || payload === void 0 ? void 0 : payload.picture,
        verify: true,
        google: true,
    };
});
const oauthGoogle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.body.idtoken;
    const googleUser = yield googleVerify(token).catch((Err) => {
        return res.status(403).json({
            ok: false,
            error: Err,
        });
    });
    console.log(googleUser);
    try {
        const findUser = yield users_models_1.default.findOne({ email: googleUser });
        if (findUser) {
            let token = (0, Token_1.generateToken)(findUser);
            return res.status(201).json({
                ok: true,
                user: findUser,
                token,
            });
        }
        const newUser = new users_models_1.default(googleUser);
        newUser.save();
        return res.status(400).json({ ok: true, user: newUser });
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
exports.oauthGoogle = oauthGoogle;
module.exports = {
    oauthGoogle: exports.oauthGoogle,
};
