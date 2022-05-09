import { Request, Response } from "express";
import User from "../models/users.models";
import bcryptjs from "bcryptjs";
import { generateCode, getTemplate, sendEmail } from "../helpers/mail";

export const createUser = (req: Request, res: Response): any => {
  if (req.body) {
    try {
      const user = new User({
        email: req.body.email,
        password: req.body.password,
        google: req.body.google,
      });

      const code = parseInt(generateCode());
      const template = getTemplate(code);

      user.verified = code;

      user
        .save()
        .then((_result) => {
          sendEmail(user.email, "Confirmacion de cuenta", template);

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
        if (user.verified === 0) {
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
          msg: "Aun no has verificado tu cuenta",
        });
      }
      return res.json({
        ok: false,
        msg: "El usuario no existe",
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

export const verifiedAccount = async (req: Request, res: Response) => {
  if (req.body) {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (user && user.verified !== 0) {
        if (user.verified === parseInt(req.body.code)) {
          user.verified = 0;

          const result = await user.save();

          if (result) {
            return res.status(202).json({
              ok: true,
              message: "Cuenta verificada exitosamente",
              result,
            });
          }
          return res.status(400).json({
            ok: false,
            message: "Ha ocurrido un error al verificar el codigo",
          });
        } else {
          return res.status(402).json({
            ok: false,
            message: "Codigo de verificacion incorrecto",
          });
        }
      } else {
        return res.json({
          ok: false,
          msg: "No se puede verificar esta cuenta",
        });
      }
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error,
      });
    }
  } else {
    return res.status(402).json({
      ok: false,
      message: "Favor, complete todos los campos",
    });
  }
};
