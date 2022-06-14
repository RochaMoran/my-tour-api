import { Request, Response } from "express";
import Site from "../models/sites.models";
import { uploadAndGetImageUrl } from "../services/Cloudinary";
import fs from "fs-extra";

export const createSite = async (req: Request, res: Response) => {
  const image = req.file?.path;

  if (req.body && image) {
    try {
      let img = await uploadAndGetImageUrl(image);

      if (img) {
        const site = new Site({
          name: req.body.name,
          description: req.body.description,
          imgUrl: img,
          country: req.body.country,
          created_by: req.body.created_by,
          covidMeasures: {
            vaccineCovid: req.body.vaccineCovid,
            faceMask: req.body.faceMask,
            statusOpen: req.body.statusOpen,
          },
          attentionSchedules: {
            open: req.body.open,
            close: req.body.close,
          },
          location: {
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            latitudeDelta: req.body.latitudeDelta,
            longitudeDelta: req.body.longitudeDelta,
          },
          tags: req.body.tags
        });

        site
          .save()
          .then((_result) => {
            fs.unlinkSync(image);

            return res.status(201).json({
              ok: true,
              site,
            });
          })
          .catch((error) => {
            fs.unlinkSync(image);

            return res.status(500).json({
              ok: false,
              message: error.message,
              error,
            });
          });
        return;
      } else {
        fs.unlinkSync(image);

        return res.status(500).json({
          ok: false,
          message: "Ha ocurrido un error al subir la imagen",
        });
      }
    } catch (error) {
      fs.unlinkSync(image);

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



export const getAllSites = async (req: Request, res: Response) => {
  try {
    const options = {
      query: {},
      limit: 2,
      page: req.params.page || 1
    };

    const sites = await Site.paginate(options);

    if (sites) {
      return res.json({
        ok: true,
        sites,
      });
    }
    return res.json({
      ok: false,
      msg: "Aún no hay sitios por ver",
    });
  } catch (error) {
    return res.json({
      ok: false,
      msg: "Ocurrio un error al traer los sitios",
      error,
    });
  }
};

export const getOneSite = async (req: Request, res: Response) => {
  try {
    const site = await Site.findById(req.params.id);

    if (site) {
      return res.json({
        ok: true,
        site,
      });
    }
    return res.json({
      ok: false,
      msg: "El sitio que buscaba no se ha encontrado",
    });
  } catch (error) {
    return res.json({
      ok: false,
      msg: "Ocurrio un error al traer el sitio",
      error,
    });
  }
};

export const getSitesByUser = async (_req: Request, res: Response) => {
  try {
    const sites = await Site.find({ created_by: _req.params.user });

    if (sites) {
      return res.json({
        ok: true,
        sites,
      });
    }
    return res.json({
      ok: false,
      msg: "Aún no hay vinculados con este usuario",
    });
  } catch (error) {
    return res.json({
      ok: false,
      msg: "Ocurrio un error al traer los sitios",
      error,
    });
  }
};

export const getSiteByTag = async (_req: Request, res: Response) => {
  try {
    const sites = await Site.find({ tags: _req.params.tag });

    if (sites) {
      return res.json({
        ok: true,
        sites,
      });
    }
    return res.json({
      ok: false,
      msg: "Aún no hay vinculados con este usuario",
    });
  } catch (error) {
    return res.json({
      ok: false,
      msg: "Ocurrio un error al traer los sitios",
      error,
    });
  }
};

export const searchSite = (req: Request, res: Response) => {
  const name = req.params.name;

  Site.find(
    { name: { $regex: name.toLowerCase(), $options: "i" } },
    (error: any, site: any) => {
      if (site.length > 0 && !error) {
        return res.json({
          ok: true,
          sites: site,
        });
      }

      if (error) {
        return res.json({
          ok: false,
          msg: "Ha ocurrido un error al realizar la busqueda",
          error,
        });
      }

      return res.json({
        ok: false,
        msg: "El sitio que buscas no existe",
      });
    }
  );
};

export const deleteSite = async (req: Request, res: Response) => {
  try {
    const site = await Site.findOneAndDelete({ _id: req.params.id });

    if (site) {
      return res.json({
        ok: true,
        msg: "Sitio eliminado exitosamente",
        site,
      });
    }
    return res.json({
      ok: false,
      msg: "El sitio que buscaba no se ha encontrado",
    });
  } catch (error) {
    return res.json({
      ok: false,
      msg: "Ocurrio un error al eliminar el sitio",
      error,
    });
  }
};

export const updateSite = async (req: Request, res: Response) => {
  if (req.params.id) {
    try {
      let img = null;

      if (req.body.imgUrl) {
        img = req.body.imgUrl;
      } else {
        img = await uploadAndGetImageUrl(req?.file?.path);
      }

      if (img) {
        Site.findByIdAndUpdate(
          { _id: req.params.id },
          {
            name: req.body.name,
            description: req.body.description,
            imgUrl: img,
            country: req.body.country,
            created_by: req.body.created_by,
            covidMeasures: {
              vaccineCovid: req.body.vaccineCovid,
              faceMask: req.body.faceMask,
              statusOpen: req.body.statusOpen,
            },
            attentionSchedules: {
              open: req.body.open,
              close: req.body.close,
            },
            location: {
              latitude: req.body.latitude,
              longitude: req.body.longitude,
              latitudeDelta: req.body.latitudeDelta,
              longitudeDelta: req.body.longitudeDelta,
            },
            tags: req.body.tags
          },
          (error, site) => {
            if (site) {
              return res.json({
                ok: true,
                site,
              }).status(201);
            } else if (error) {
              return res.json({
                ok: false,
                msg: error?.message,
                error,
              }).status(500);
            } else {
              return res.json({
                ok: false,
                msg: "Ocurrio un error al actualizar el sitio",
                error,
              }).status(500);
            }
          }
          );
          return;
      } else {
        req.file?.path && fs.unlinkSync(req.file?.path);
  
        return res.json({
          ok: false,
          message: "Ha ocurrido un error al subir la imagen",
        }).status(500);
      }
    } catch (error) {
      req.file?.path && fs.unlinkSync(req.file?.path);

      return res.json({
        ok: false,
        message: error,
        error,
      }).status(500);
    }
  } else {
    return res.json({
      ok: false,
      msg: "El sitio que busca no se ha encontrado",
    });
  }
};
