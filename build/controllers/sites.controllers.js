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
exports.updateSite = exports.deleteSite = exports.searchSite = exports.getSiteByTag = exports.getSitesByUser = exports.getOneSite = exports.getAllSites = exports.createSite = void 0;
const sites_models_1 = __importDefault(require("../models/sites.models"));
const Cloudinary_1 = require("../services/Cloudinary");
const fs_extra_1 = __importDefault(require("fs-extra"));
const createSite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    if (req.body && image) {
        try {
            let img = yield (0, Cloudinary_1.uploadAndGetImageUrl)(image);
            if (img) {
                const site = new sites_models_1.default({
                    name: req.body.name,
                    description: req.body.description,
                    imgUrl: img,
                    country: req.body.country,
                    created_by: req.body.created_by,
                    covidMeasures: {
                        vaccineCovid: req.body.vaccineCovid,
                        faceMask: req.body.faceMask,
                        statusOpen: req.body.statusOpen,
                    },
                    attentionSchedules: {
                        open: req.body.open,
                        close: req.body.close,
                    },
                    location: {
                        latitude: req.body.latitude,
                        longitude: req.body.longitude,
                        latitudeDelta: req.body.latitudeDelta,
                        longitudeDelta: req.body.longitudeDelta,
                    },
                    tags: req.body.tags
                });
                site
                    .save()
                    .then((_result) => {
                    fs_extra_1.default.unlinkSync(image);
                    return res.status(201).json({
                        ok: true,
                        site,
                    });
                })
                    .catch((error) => {
                    fs_extra_1.default.unlinkSync(image);
                    return res.status(500).json({
                        ok: false,
                        message: error.message,
                        error,
                    });
                });
                return;
            }
            else {
                fs_extra_1.default.unlinkSync(image);
                return res.status(500).json({
                    ok: false,
                    message: "Ha ocurrido un error al subir la imagen",
                });
            }
        }
        catch (error) {
            fs_extra_1.default.unlinkSync(image);
            return res.status(500).json({
                ok: false,
                message: error,
                error,
            });
        }
    }
    else {
        return res.status(500).json({
            ok: false,
            message: "Favor, complete todos los campos",
        });
    }
});
exports.createSite = createSite;
const getAllSites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = {
            query: {},
            limit: 3,
            page: req.params.page || 1
        };
        const sites = yield sites_models_1.default.paginate(options);
        if (sites) {
            return res.json({
                ok: true,
                sites,
            });
        }
        return res.json({
            ok: false,
            msg: "Aún no hay sitios por ver",
        });
    }
    catch (error) {
        return res.json({
            ok: false,
            msg: "Ocurrio un error al traer los sitios",
            error,
        });
    }
});
exports.getAllSites = getAllSites;
const getOneSite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const site = yield sites_models_1.default.findById(req.params.id);
        if (site) {
            return res.json({
                ok: true,
                site,
            });
        }
        return res.json({
            ok: false,
            msg: "El sitio que buscaba no se ha encontrado",
        });
    }
    catch (error) {
        return res.json({
            ok: false,
            msg: "Ocurrio un error al traer el sitio",
            error,
        });
    }
});
exports.getOneSite = getOneSite;
const getSitesByUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sites = yield sites_models_1.default.find({ created_by: _req.params.user });
        if (sites) {
            return res.json({
                ok: true,
                sites,
            });
        }
        return res.json({
            ok: false,
            msg: "Aún no hay vinculados con este usuario",
        });
    }
    catch (error) {
        return res.json({
            ok: false,
            msg: "Ocurrio un error al traer los sitios",
            error,
        });
    }
});
exports.getSitesByUser = getSitesByUser;
const getSiteByTag = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sites = yield sites_models_1.default.find({ tags: _req.params.tag });
        if (sites) {
            return res.json({
                ok: true,
                sites,
            });
        }
        return res.json({
            ok: false,
            msg: "Aún no hay vinculados con este usuario",
        });
    }
    catch (error) {
        return res.json({
            ok: false,
            msg: "Ocurrio un error al traer los sitios",
            error,
        });
    }
});
exports.getSiteByTag = getSiteByTag;
const searchSite = (req, res) => {
    const name = req.params.name;
    sites_models_1.default.find({ name: { $regex: name.toLowerCase(), $options: "i" } }, (error, site) => {
        if (site.length > 0 && !error) {
            return res.json({
                ok: true,
                sites: site,
            });
        }
        if (error) {
            return res.json({
                ok: false,
                msg: "Ha ocurrido un error al realizar la busqueda",
                error,
            });
        }
        return res.json({
            ok: false,
            msg: "El sitio que buscas no existe",
        });
    });
};
exports.searchSite = searchSite;
const deleteSite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const site = yield sites_models_1.default.findOneAndDelete({ _id: req.params.id });
        if (site) {
            return res.json({
                ok: true,
                msg: "Sitio eliminado exitosamente",
                site,
            });
        }
        return res.json({
            ok: false,
            msg: "El sitio que buscaba no se ha encontrado",
        });
    }
    catch (error) {
        return res.json({
            ok: false,
            msg: "Ocurrio un error al eliminar el sitio",
            error,
        });
    }
});
exports.deleteSite = deleteSite;
const updateSite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e, _f;
    if (req.params.id) {
        try {
            let img = null;
            if (req.body.imgUrl) {
                img = req.body.imgUrl;
            }
            else {
                img = yield (0, Cloudinary_1.uploadAndGetImageUrl)((_b = req === null || req === void 0 ? void 0 : req.file) === null || _b === void 0 ? void 0 : _b.path);
            }
            if (img) {
                sites_models_1.default.findByIdAndUpdate({ _id: req.params.id }, {
                    name: req.body.name,
                    description: req.body.description,
                    imgUrl: img,
                    country: req.body.country,
                    created_by: req.body.created_by,
                    covidMeasures: {
                        vaccineCovid: req.body.vaccineCovid,
                        faceMask: req.body.faceMask,
                        statusOpen: req.body.statusOpen,
                    },
                    attentionSchedules: {
                        open: req.body.open,
                        close: req.body.close,
                    },
                    location: {
                        latitude: req.body.latitude,
                        longitude: req.body.longitude,
                        latitudeDelta: req.body.latitudeDelta,
                        longitudeDelta: req.body.longitudeDelta,
                    },
                    tags: req.body.tags
                }, (error, site) => {
                    if (site) {
                        return res.json({
                            ok: true,
                            site,
                        }).status(201);
                    }
                    else if (error) {
                        return res.json({
                            ok: false,
                            msg: error === null || error === void 0 ? void 0 : error.message,
                            error,
                        }).status(500);
                    }
                    else {
                        return res.json({
                            ok: false,
                            msg: "Ocurrio un error al actualizar el sitio",
                            error,
                        }).status(500);
                    }
                });
                return;
            }
            else {
                ((_c = req.file) === null || _c === void 0 ? void 0 : _c.path) && fs_extra_1.default.unlinkSync((_d = req.file) === null || _d === void 0 ? void 0 : _d.path);
                return res.json({
                    ok: false,
                    message: "Ha ocurrido un error al subir la imagen",
                }).status(500);
            }
        }
        catch (error) {
            ((_e = req.file) === null || _e === void 0 ? void 0 : _e.path) && fs_extra_1.default.unlinkSync((_f = req.file) === null || _f === void 0 ? void 0 : _f.path);
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
            msg: "El sitio que busca no se ha encontrado",
        });
    }
});
exports.updateSite = updateSite;
