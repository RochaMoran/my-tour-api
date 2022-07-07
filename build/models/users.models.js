"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const logging_1 = __importDefault(require("../config/logging"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
let salt = parseInt(bcryptjs_1.default.genSaltSync(10));
const UserSchema = new mongoose_1.Schema({
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
    favorites: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
});
UserSchema.pre("save", function (next) {
    let user = this;
    if (user.isModified("password")) {
        bcryptjs_1.default.genSalt(salt, function (err, salt) {
            if (err)
                return next(err);
            bcryptjs_1.default.hash(user.password, salt, function (err, hash) {
                if (err)
                    return next(err);
                user.password = hash;
                next();
            });
        });
    }
    else {
        next();
    }
});
UserSchema.methods.comparepassword = function (password, cb) {
    bcryptjs_1.default.compare(password, this.password, function (err, isMatch) {
        if (err)
            throw err;
        cb(null, isMatch);
    });
};
UserSchema.post("save", function () {
    logging_1.default.info("Mongo", "Checkout the user we just saved: ");
});
UserSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};
exports.default = (0, mongoose_1.model)("Users", UserSchema);
