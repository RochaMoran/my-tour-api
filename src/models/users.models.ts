import { Schema, model } from "mongoose";
import logging from "../config/logging";
import IUser from "../interfaces/IUser";
import bcrypjs from "bcryptjs";

let salt:number = parseInt(bcrypjs.genSaltSync(10));

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String
    },
    password: String,
    google: {
      type: Boolean,
      required: true,
      default: false,
    },
    verified: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next: any) {
  let user = this;

  if (user.isModified("password")) {
    bcrypjs.genSalt(salt, function (err, salt) {
      if (err) return next(err);

      bcrypjs.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.comparepassword = function (password: string, cb: any) {
  bcrypjs.compare(password, this.password, function (err, isMatch) {
    if (err) throw err
    cb(null, isMatch);
  });
};

UserSchema.post<IUser>("save", function () {
  logging.info("Mongo", "Checkout the user we just saved: ");
});

UserSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

export default model<IUser>("Users", UserSchema);
