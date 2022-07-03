"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, "../storage/sites"),
    filename: (_req, file, cb) => {
        cb(null, (0, uuid_1.v4)() + path_1.default.extname(file.originalname).toLowerCase());
    },
});
exports.upload = (0, multer_1.default)({
    storage: storage,
    dest: path_1.default.join(__dirname, "../storage/sites"),
    fileFilter: (_req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|svg|jfif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path_1.default.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error("error: El formato de la imagen no es valido, los formatos permitidos son: jpeg|jpg|png|gif|svg|jfif"));
    },
});
