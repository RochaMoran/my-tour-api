"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSite = void 0;
const sites_models_1 = __importDefault(require("../models/sites.models"));
const createSite = (req, res) => {
    if (req.body) {
        try {
            const site = new sites_models_1.default({
                name: req.body.name,
                description: req.body.description,
                imgUrl: req.body.imgUrl,
                country: req.body.country,
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
            });
            site
                .save()
                .then((_result) => {
                return res.status(201).json({
                    ok: true,
                    site,
                });
            })
                .catch((error) => {
                return res.status(500).json({
                    ok: false,
                    message: error.message,
                    error,
                });
            });
        }
        catch (error) {
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
};
exports.createSite = createSite;
