"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dialogflowController_1 = require("../controllers/dialogflowController");
const router = (0, express_1.Router)();
router.post('/dialogflow', dialogflowController_1.sendMessage);
exports.default = router;
