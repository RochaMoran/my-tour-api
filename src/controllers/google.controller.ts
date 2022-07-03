import { OAuth2Client } from "google-auth-library"
import { Request, Response } from "express"
import { generateToken } from "../services/Token";
// import { Token } from "../../../services/Tokens"
import User from "../models/users.models";
// import User  from "../../../models/user.models"
const client = new OAuth2Client(
  "466043510019-kubd3rqjjesnd07st5fh888smv05bqg9.apps.googleusercontent.com"
);

const googleVerify = async (token:any) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience:
      "466043510019-kubd3rqjjesnd07st5fh888smv05bqg9.apps.googleusercontent.com",
  });
  const payload = ticket.getPayload();
  return {
    username: payload?.name,
    email: payload?.email,
    img: payload?.picture,
    verify: true,
    google: true,
  };
};

export const oauthGoogle = async (req:Request, res:Response) => {
  let token = req.body.idtoken;

  const googleUser = await googleVerify(token).catch((Err) => {
    return res.status(403).json({
      ok: false,
      error: Err,
    });
  });

  console.log(googleUser)

  try {
    const findUser = await User.findOne({ email: googleUser });

    if (findUser) {
      let token = generateToken(findUser);

      return res.status(201).json({
        ok: true,
        user: findUser,
        token,
      });
    }

    const newUser = new User(googleUser);
    newUser.save();
    return res.status(400).json({ ok: true, user: newUser });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = {
  oauthGoogle,
};
