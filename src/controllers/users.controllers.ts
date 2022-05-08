import { Request, Response } from "express";
import User from "../models/users.models";

export const createUser = (req: Request, res: Response): any => {
  if (req.body) {
    try {
      const user = new User({
        email: req.body.email,
        password: req.body.password,
        google: req.body.google
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
