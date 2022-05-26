import { Request, Response } from "express";
import User from "../models/users.models";
import bcryptjs from "bcryptjs";
import { generateCode, getTemplate, sendEmail } from "../helpers/mail";
import { generateToken } from "../services/Token";

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

          return res.json({
            ok: true,
            user,
          }).status(201);
        })
        .catch((error) => {
          return res.json({
            ok: false,
            message: error.message,
            error,
          }).status(500);
        });
    } catch (error) {
      return res.json({
        ok: false,
        message: error,
        error,
      }).status(500);
    }
  } else {
    return res.json({
      ok: false,
      message: "Favor, complete todos los campos",
    }).status(500);
  }
};

export const login = async (req: Request, res: Response) => {
  if (req.body) {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (user) {
        if (user.verified === 0) {
          if (bcryptjs.compareSync(req.body.password, user.password)) {
            let token = generateToken(user)

            return res.json({
              ok: true,
              user,
              token
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
      return res.json({
        ok: false,
        message: error,
      }).status(500);
    }
  } else {
    return res.json({
      ok: false,
      message: "Favor, complete todos los campos",
    }).status(500);
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
            let token = generateToken(user)

            return res.json({
              ok: true,
              msg: "Cuenta verificada exitosamente",
              user,
              token
            }).status(202);
          }
          return res.json({
            ok: false,
            msg: "Ha ocurrido un error al verificar el codigo",
          }).status(400);
        } else {
          return res.json({
            ok: false,
            msg: "Codigo de verificacion incorrecto",
          }).status(402);
        }
      } else {
        return res.json({
          ok: false,
          msg: "No se puede verificar esta cuenta",
        });
      }
    } catch (error) {
      return res.json({
        ok: false,
        msg: error,
      }).status(500);
    }
  } else {
    return res.json({
      ok: false,
      msg: "Favor, complete todos los campos",
    }).status(402);
  }
};
