import { check } from 'express-validator'
import { Request, Response, NextFunction } from "express";
import { validateResult } from '../helpers/validateHelper';

export const validateRegister = [
    check('email')
        .exists()
        .notEmpty()
        .withMessage("Favor, ingrese su correo")
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage("Favor, ingrese un correo valido"),
    check('password')
        .exists()
        .notEmpty()
        .withMessage("Favor, ingrese su contraseña")
        .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*.])[a-zA-Z0-9!@#$%^&*.]{6,16}$/)
        .withMessage("Ingrese una contraseña segura"),
        (req:Request, res:Response, next:NextFunction) => {
            validateResult(req, res, next)
        }
]

export const validateLogin = [
    check('email')
        .exists()
        .notEmpty()
        .withMessage("Favor, ingrese su correo")
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage("Favor, ingrese un correo valido"),
    check('password')
        .exists()
        .notEmpty()
        .withMessage("Favor, ingrese su contraseña"),
        (req:Request, res:Response, next:NextFunction) => {
            validateResult(req, res, next)
        }
]

export const validateVerifiedCode = [
    check('email')
        .exists()
        .notEmpty()
        .withMessage("Favor, ingrese su correo")
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage("Favor, ingrese un correo valido"),
    check('code')
        .exists()
        .notEmpty()
        .withMessage("Favor, ingrese su codigo")
        .matches(/^.{5,6}$/)
        .withMessage("Su codigo debe tener 5 o 6 digitos"),
        (req:Request, res:Response, next:NextFunction) => {
            validateResult(req, res, next)
        }
]