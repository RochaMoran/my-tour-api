import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from "express";

export const validateResult = (req:Request, res:Response, next:NextFunction) => {
    try {
        validationResult(req).throw()
        return next()
    } catch(error:any) {
        res.json({
            ok: false,
            errors: error.array()[0]
        }).status(403)
    }
}