"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCode = exports.getTemplate = exports.sendEmail = void 0;
let nodemailer = require("nodemailer");
let smtpTransport = require("nodemailer-smtp-transport");
const index_1 = __importDefault(require("../config/index"));
let transporter = nodemailer.createTransport(smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    tls: {
        rejectUnauthorized: false,
    },
    auth: {
        user: index_1.default.email.name,
        pass: index_1.default.email.password,
    },
}));
const sendEmail = (email, subject, html) => {
    try {
        let mailOptions = {
            from: `MyTour <${index_1.default.email.name}>`,
            to: email,
            subject,
            text: "Hola pequeño viajero",
            html,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Email sent: " + info.response);
            }
        });
    }
    catch (error) {
        console.log("Error con el mail ", error);
    }
};
exports.sendEmail = sendEmail;
const getTemplate = (code) => {
    return `
    <body style="display: grid; place-items: center;">
        <img style="width: 50%; border-radius: 5px; box-shadow: 5px 5px 20px #333;" src="https://www.bbva.com/wp-content/uploads/2020/12/turismo_sostenible-1024x629.jpg" alt="img-my-tour" />
        <h1 style="text-transform: uppercase; font-family: Arial, Helvetica, sans-serif;  margin: 0; margin-top: 15px;">Hola
            pequeño viajero: </h1>
        <div style="display: flex; font-family: Arial, Helvetica, sans-serif; ">
            <span>Tu codigo de verificacion es: </span>
            <span style="font-weight: bold;">${code}</span>
        </div>
    </body>
    `;
};
exports.getTemplate = getTemplate;
const generateCode = () => {
    return (generateNumber() +
        "" +
        generateNumber() +
        "" +
        generateNumber() +
        "" +
        generateNumber() +
        "" +
        generateNumber() +
        "" +
        generateNumber());
};
exports.generateCode = generateCode;
const generateNumber = () => Math.floor(Math.random() * (9 - 0 + 1) + 0);
