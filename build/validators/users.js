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
exports.validateVerifiedCode = exports.validateLogin = exports.validateRegister = void 0;
const express_validator_1 = require("express-validator");
const validateHelper_1 = require("../helpers/validateHelper");
const users_models_1 = __importDefault(require("../models/users.models"));
exports.validateRegister = [
    (0, express_validator_1.check)('email')
        .custom((email) => __awaiter(void 0, void 0, void 0, function* () {
        let existUser = yield users_models_1.default.findOne({ email });
        if (existUser) {
            throw new Error('Este correo ya esta en uso');
        }
    }))
        .notEmpty()
        .withMessage("Favor, ingrese su correo")
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage("Favor, ingrese un correo valido"),
    (0, express_validator_1.check)('password')
        .exists()
        .notEmpty()
        .withMessage("Favor, ingrese su contraseña")
        .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*.])[a-zA-Z0-9!@#$%^&*.]{6,16}$/)
        .withMessage("Ingrese una contraseña segura que contenga almenos 6 digitos, un caracter especial y un numero"),
    (req, res, next) => {
        (0, validateHelper_1.validateResult)(req, res, next);
    }
];
exports.validateLogin = [
    (0, express_validator_1.check)('email')
        .exists()
        .notEmpty()
        .withMessage("Favor, ingrese su correo")
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage("Favor, ingrese un correo valido"),
    (0, express_validator_1.check)('password')
        .exists()
        .notEmpty()
        .withMessage("Favor, ingrese su contraseña"),
    (req, res, next) => {
        (0, validateHelper_1.validateResult)(req, res, next);
    }
];
exports.validateVerifiedCode = [
    (0, express_validator_1.check)('email')
        .exists()
        .notEmpty()
        .withMessage("Favor, ingrese su correo")
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage("Favor, ingrese un correo valido"),
    (0, express_validator_1.check)('code')
        .exists()
        .notEmpty()
        .withMessage("Favor, ingrese su codigo")
        .matches(/^.{5,6}$/)
        .withMessage("Su codigo debe tener 5 o 6 digitos"),
    (req, res, next) => {
        (0, validateHelper_1.validateResult)(req, res, next);
    }
];
