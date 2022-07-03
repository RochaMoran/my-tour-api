import jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import config from '../config'

export function authenticateToken(req:any, res:Response, next:NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, config.token.secret, (err:any, user:any) => {
      if (err) return res.json({
          ok: false,
          msg: "Ha ocurrido un error con su token",
          error: err
      }).status(403)
      
      req.user = user
      next()
      return
    })

    return;
  }
  