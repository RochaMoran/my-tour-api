"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../../controllers/users.controllers");
const users_1 = require("../../validators/users");
const google_controller_1 = require("../../controllers/google.controller");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    res.send("Fetching all users");
});
router.get('/one/:id', users_controllers_1.getOneUser);
router.post('/register/', users_1.validateRegister, users_controllers_1.createUser);
router.post('/login/', users_1.validateLogin, users_controllers_1.login);
router.post('/google/', google_controller_1.oauthGoogle);
router.put('/verified/', users_1.validateVerifiedCode, users_controllers_1.verifiedAccount);
router.put('/favorite/:id', users_controllers_1.addSiteToFavorite);
router.delete('/favorite/:id/:site', users_controllers_1.deleteSiteToFavorite);
exports.default = router;
