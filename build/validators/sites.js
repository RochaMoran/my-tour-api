"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSiteValidate = void 0;
const express_validator_1 = require("express-validator");
const validateHelper_1 = require("../helpers/validateHelper");
exports.createSiteValidate = [
    (0, express_validator_1.check)('name')
        .notEmpty()
        .withMessage("Favor, ingrese nombre del sitio"),
    (0, express_validator_1.check)('description')
        .notEmpty()
        .withMessage("Favor, ingrese una descripcion para el sitio"),
    (0, express_validator_1.check)('country')
        .exists()
        .notEmpty()
        .withMessage("Favor, seleccione el pais del sitio"),
    (0, express_validator_1.check)('vaccineCovid')
        .exists()
        .notEmpty()
        .withMessage("Favor, seleccione si la vacuna es exigida en el lugar"),
    (0, express_validator_1.check)('faceMask')
        .exists()
        .notEmpty()
        .withMessage("Favor, seleccione si la mascarilla es exigida en el lugar"),
    (0, express_validator_1.check)('statusOpen')
        .exists()
        .notEmpty()
        .withMessage("Favor, seleccione si el sitio esta abierto o cerrado"),
    (0, express_validator_1.check)('open')
        .exists()
        .notEmpty()
        .withMessage("Favor, brindenos la hora de apertura del sitio"),
    (0, express_validator_1.check)('close')
        .exists()
        .notEmpty()
        .withMessage("Favor, brindenos la hora de cierre del sitio"),
    (0, express_validator_1.check)('latitude')
        .exists()
        .notEmpty()
        .withMessage("Ingrese la latitude del sitio"),
    (0, express_validator_1.check)('longitude')
        .exists()
        .notEmpty()
        .withMessage("Ingrese la longitude del sitio"),
    (0, express_validator_1.check)('latitudeDelta')
        .exists()
        .notEmpty()
        .withMessage("Ingrese la latitudeDelta del sitio"),
    (0, express_validator_1.check)('longitudeDelta')
        .exists()
        .notEmpty()
        .withMessage("Ingrese la longitudeDelta del sitio"),
    (0, express_validator_1.check)('created_by')
        .exists()
        .notEmpty()
        .withMessage("No se puede crear un sitio sin un representante"),
    (req, res, next) => {
        (0, validateHelper_1.validateResult)(req, res, next);
    }
];
