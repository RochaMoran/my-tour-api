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
exports.deleteSiteToFavorite = exports.addSiteToFavorite = exports.verifiedAccount = exports.login = exports.getOneUser = exports.createUser = void 0;
const users_models_1 = __importDefault(require("../models/users.models"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mail_1 = require("../helpers/mail");
const Token_1 = require("../services/Token");
const sites_models_1 = __importDefault(require("../models/sites.models"));
const createUser = (req, res) => {
    if (req.body) {
        try {
            const user = new users_models_1.default({
                email: req.body.email,
                password: req.body.password,
                google: req.body.google,
            });
            const code = parseInt((0, mail_1.generateCode)());
            const template = (0, mail_1.getTemplate)(code);
            user.verified = code;
            user
                .save()
                .then((_result) => {
                (0, mail_1.sendEmail)(user.email, "Confirmacion de cuenta", template);
                return res.json({
                    ok: true,
                    user,
                }).status(201);
            })
                .catch((error) => {
                return res.json({
                    ok: false,
                    message: error.message,
                    error,
                }).status(500);
            });
        }
        catch (error) {
            return res.json({
                ok: false,
                message: error,
                error,
            }).status(500);
        }
    }
    else {
        return res.json({
            ok: false,
            message: "Favor, complete todos los campos",
        }).status(500);
    }
};
exports.createUser = createUser;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_models_1.default.findById(req.params.id);
        if (user) {
            return res.json({
                ok: true,
                msg: "Usuario encontrado exitosamente",
                user
            });
        }
        return res.json({
            ok: false,
            msg: "El usuario no existe"
        });
    }
    catch (e) {
        return res.json({
            ok: false,
            msg: e,
        }).status(500);
    }
});
exports.getOneUser = getOneUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body) {
        try {
            const user = yield users_models_1.default.findOne({ email: req.body.email });
            if (user) {
                if (user.verified === 0) {
                    if (bcryptjs_1.default.compareSync(req.body.password, user.password)) {
                        let token = (0, Token_1.generateToken)(user);
                        return res.json({
                            ok: true,
                            user,
                            token
                        });
                    }
                    return res.json({
                        ok: false,
                        msg: "La contraseña no coincide",
                    });
                }
                return res.json({
                    ok: false,
                    msg: "Aun no has verificado tu cuenta",
                });
            }
            return res.json({
                ok: false,
                msg: "El usuario no existe",
            });
        }
        catch (error) {
            return res.json({
                ok: false,
                message: error,
            }).status(500);
        }
    }
    else {
        return res.json({
            ok: false,
            message: "Favor, complete todos los campos",
        }).status(500);
    }
});
exports.login = login;
const verifiedAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body) {
        try {
            const user = yield users_models_1.default.findOne({ email: req.body.email });
            if (user && user.verified !== 0) {
                if (user.verified === parseInt(req.body.code)) {
                    user.verified = 0;
                    const result = yield user.save();
                    if (result) {
                        let token = (0, Token_1.generateToken)(user);
                        return res.json({
                            ok: true,
                            msg: "Cuenta verificada exitosamente",
                            user,
                            token
                        }).status(202);
                    }
                    return res.json({
                        ok: false,
                        msg: "Ha ocurrido un error al verificar el codigo",
                    }).status(400);
                }
                else {
                    return res.json({
                        ok: false,
                        msg: "Codigo de verificacion incorrecto",
                    }).status(402);
                }
            }
            else {
                return res.json({
                    ok: false,
                    msg: "No se puede verificar esta cuenta",
                });
            }
        }
        catch (error) {
            return res.json({
                ok: false,
                msg: error,
            }).status(500);
        }
    }
    else {
        return res.json({
            ok: false,
            msg: "Favor, complete todos los campos",
        }).status(402);
    }
});
exports.verifiedAccount = verifiedAccount;
const addSiteToFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const siteSearch = yield sites_models_1.default.findById(req.body.site);
        if (siteSearch) {
            sites_models_1.default.findByIdAndUpdate({ _id: siteSearch._id }, Object.assign(Object.assign({}, siteSearch), { rate: siteSearch.rate++ }), (error, site) => __awaiter(void 0, void 0, void 0, function* () {
                yield users_models_1.default.updateOne({ _id: req.params.id }, { $addToSet: { favorites: req.body.site } });
                if (site) {
                    return res.json({
                        ok: true,
                        msg: "Sitio añadido a favoritos",
                    });
                }
                else if (error) {
                    return res.status(500).json({
                        ok: false,
                        msg: error === null || error === void 0 ? void 0 : error.message,
                        error,
                    });
                }
                else {
                    return res.status(500).json({
                        ok: false,
                        msg: "Ocurrio un error al añadir el sitio a favs",
                        error,
                    });
                }
            }));
        }
        else {
            return res.json({
                ok: false,
                msg: "El sitio que intentas añadir a favoritos no existe",
            });
        }
        return;
    }
    catch (e) {
        return res
            .json({
            ok: false,
            msg: e,
        })
            .status(402);
    }
});
exports.addSiteToFavorite = addSiteToFavorite;
const deleteSiteToFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const siteSearch = yield sites_models_1.default.findById(req.params.site);
        if (siteSearch) {
            sites_models_1.default.findByIdAndUpdate({ _id: siteSearch._id }, Object.assign(Object.assign({}, siteSearch), { rate: siteSearch.rate-- }), (error, site) => __awaiter(void 0, void 0, void 0, function* () {
                yield users_models_1.default.updateOne({ _id: req.params.id }, { $pull: { favorites: req.params.site } });
                if (site && !error) {
                    return res.json({
                        ok: true,
                        msg: "Sitio removido de favoritos",
                    });
                }
                else {
                    return res.status(500).json({
                        ok: false,
                        msg: "Ocurrio un error al eliminar el sitio de favs",
                        error,
                    });
                }
            }));
        }
        else {
            return res.json({
                ok: false,
                msg: "El sitio que intentas eliminar de favoritos no existe",
            });
        }
        return;
    }
    catch (e) {
        return res
            .json({
            ok: false,
            msg: e,
        })
            .status(402);
    }
});
exports.deleteSiteToFavorite = deleteSiteToFavorite;
