import path from "path"
import multer from "multer"
import { v4 as uuidv4 }  from "uuid"
import { Request } from 'express'

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../storage/sites"),
  filename: (_req:Request, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname).toLowerCase());
  },
});

export const upload = multer({
  storage: storage,
  dest: path.join(__dirname, "../storage/sites"),

  fileFilter: (_req:Request, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|svg|jfif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("error: El formato de la imagen no es valido, los formatos permitidos son: jpeg|jpg|png|gif|svg|jfif"));
  },
});
