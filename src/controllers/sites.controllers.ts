import { Request, Response } from "express";
import Site from "../models/sites.models";

export const createSite = (req: Request, res: Response): any => {
  if (req.body) {
    try {
      const site = new Site({
        name: req.body.name,
        description: req.body.description,
        imgUrl: req.body.imgUrl,
        country: req.body.country,
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
          return res.status(201).json({
            ok: true,
            site,
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
