import config from "../config";
const jwt = require("jsonwebtoken")

export const verifyToken = (token:any) => {
  let data;

  if (token) {
    throw new Error("Se necesita el Token");
  }

  jwt.verify(token, config.token.secret, (err:object, decode:any) => {
    if (err) {
      throw new Error("Token no valido");
    }
    data = decode.user;
  });
  return data;
};

export const generateToken = (user:any) => {
  const newToken = jwt.sign({ user }, config.token.secret);
  return newToken;
};
