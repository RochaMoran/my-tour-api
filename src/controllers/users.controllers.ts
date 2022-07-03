import { Request, Response } from "express";
import User from "../models/users.models";
import bcryptjs from "bcryptjs";
import { generateCode, getTemplate, sendEmail } from "../helpers/mail";
import { generateToken } from "../services/Token";
import Site from "../models/sites.models";

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

export const getOneUser = async (req:Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id)

    if(user) {
      return res.json({
        ok: true,
        msg: "Usuario encontrado exitosamente",
        user
      })
    }

    return res.json({
      ok: false,
      msg: "El usuario no existe"
    })
  } catch(e) {
    return res.json({
      ok: false,
      msg: e,
    }).status(500);
  }
}

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

export const addSiteToFavorite = async (req: Request, res: Response) => {
  try {
    const siteSearch = await Site.findById(req.body.site);
    
    if (siteSearch) {
        Site.findByIdAndUpdate(
          { _id: siteSearch._id },
          { ...siteSearch, rate: siteSearch.rate++ },
          async (error, site) => {
            await User.updateOne(
              { _id: req.params.id },
              { $addToSet: { favorites: req.body.site } }
            );

            if (site) {
              return res.json({
                ok: true,
                msg: "Sitio añadido a favoritos",
              });
            } else if (error) {
              return res.status(500).json({
                ok: false,
                msg: error?.message,
                error,
              });
            } else {
              return res.status(500).json({
                ok: false,
                msg: "Ocurrio un error al añadir el sitio a favs",
                error,
              });
            }
          }
        );
      } else {
        return res.json({
          ok: false,
          msg: "El sitio que intentas añadir a favoritos no existe",
        });
      }

      return
  } catch (e) {
    return res
      .json({
        ok: false,
        msg: e,
      })
      .status(402);
  }
};

export const deleteSiteToFavorite = async (req: Request, res: Response) => {
  try {
    const siteSearch = await Site.findById(req.params.site);
    
    if (siteSearch) {
        Site.findByIdAndUpdate(
          { _id: siteSearch._id },
          { ...siteSearch, rate: siteSearch.rate-- },
          async (error, site) => {
            await User.updateOne(
              { _id: req.params.id },
              { $pull: { favorites: req.params.site } }
            );

            if (site && !error) {
              return res.json({
                ok: true,
                msg: "Sitio removido de favoritos",
              });
            } else {
              return res.status(500).json({
                ok: false,
                msg: "Ocurrio un error al eliminar el sitio de favs",
                error,
              });
            }
          }
        );
      } else {
        return res.json({
          ok: false,
          msg: "El sitio que intentas eliminar de favoritos no existe",
        });
      }

      return
  } catch (e) {
    return res
      .json({
        ok: false,
        msg: e,
      })
      .status(402);
  }
};