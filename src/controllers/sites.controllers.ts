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
