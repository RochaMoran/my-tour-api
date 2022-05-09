let nodemailer = require("nodemailer");
let smtpTransport = require("nodemailer-smtp-transport");
import config from "../config/index";

let transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: config.email.name,
      pass: config.email.password,
    },
  })
);

const sendEmail = (email: string, subject: string, html: any) => {
  try {
    let mailOptions = {
      from: `MyTour <${config.email.name}>`,
      to: email,
      subject,
      text: "Hola pequeño viajero",
      html,
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log("Error con el mail ", error);
  }
};

const getTemplate = (code: number) => {
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

const generateCode = () => {
  return (
    generateNumber() +
    "" +
    generateNumber() +
    "" +
    generateNumber() +
    "" +
    generateNumber() +
    "" +
    generateNumber() +
    "" +
    generateNumber()
  );
};

const generateNumber = () => Math.floor(Math.random() * (9 - 0 + 1) + 0);

export { sendEmail, getTemplate, generateCode };
