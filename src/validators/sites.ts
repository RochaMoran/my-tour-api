import { check } from 'express-validator'
import { Request, Response, NextFunction } from "express";
import { validateResult } from '../helpers/validateHelper';

export const createSiteValidate = [
    check('name')
        .notEmpty()
        .withMessage("Favor, ingrese nombre del sitio"),
    check('description')
        .notEmpty()
        .withMessage("Favor, ingrese una descripcion para el sitio"),
    check('country')
        .exists()
        .notEmpty()
        .withMessage("Favor, seleccione el pais del sitio"),
    check('vaccineCovid')
        .exists()
        .notEmpty()
        .withMessage("Favor, seleccione si la vacuna es exigida en el lugar"),
    check('faceMask')
        .exists()
        .notEmpty()
        .withMessage("Favor, seleccione si la mascarilla es exigida en el lugar"),
    check('statusOpen')
        .exists()
        .notEmpty()
        .withMessage("Favor, seleccione si el sitio esta abierto o cerrado"),
    check('open')
        .exists()
        .notEmpty()
        .withMessage("Favor, brindenos la hora de apertura del sitio"),
    check('close')
        .exists()
        .notEmpty()
        .withMessage("Favor, brindenos la hora de cierre del sitio"),
    check('latitude')
        .exists()
        .notEmpty()
        .withMessage("Ingrese la latitude del sitio"),
    check('longitude')
        .exists()
        .notEmpty()
        .withMessage("Ingrese la longitude del sitio"),
    check('latitudeDelta')
        .exists()
        .notEmpty()
        .withMessage("Ingrese la latitudeDelta del sitio"),
    check('longitudeDelta')
        .exists()
        .notEmpty()
        .withMessage("Ingrese la longitudeDelta del sitio"),
    check('created_by')
        .exists()
        .notEmpty()
        .withMessage("No se puede crear un sitio sin un representante"),
        (req:Request, res:Response, next:NextFunction) => {
            validateResult(req, res, next)
        }
]
