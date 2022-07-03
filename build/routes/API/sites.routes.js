"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sites_controllers_1 = require("../../controllers/sites.controllers");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    res.send("Fetching all sites");
});
router.post('/create/', sites_controllers_1.createSite);
exports.default = router;
