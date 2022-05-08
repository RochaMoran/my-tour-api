import { Request, Response } from "express";
import User from "../models/users.models";
import bcryptjs from "bcryptjs";

export const createUser = (req: Request, res: Response): any => {
  if (req.body) {
    try {
      const user = new User({
        email: req.body.email,
        password: req.body.password,
        google: req.body.google,
      });

      user
        .save()
        .then((_result) => {
          return res.status(201).json({
            ok: true,
            user,
          });
        })
        .catch((error) => {
          return res.status(500).json({
            ok: false,
            message: error.message,
            error,
          });
        });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error,
        error,
      });
    }
  } else {
    return res.status(500).json({
      ok: false,
      message: "Favor, complete todos los campos",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  if (req.body) {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (user) {
        if (user.verified) {
          if (bcryptjs.compareSync(req.body.password, user.password)) {
            return res.json({
              ok: true,
              user,
            });
          }

          return res.json({
            ok: false,
            msg: "La contraseña no coincide",
          });
        }
        return res.json({
          ok: false,
          msg: "El usuario aun no verifica su cuenta",
        });
      }
      return res.json({
        ok: false,
        msg: "El que ingresaste usuario no existe",
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error,
      });
    }
  } else {
    return res.status(500).json({
      ok: false,
      message: "Favor, complete todos los campos",
    });
  }
};
