"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminController_1 = require("../controller/Admin/AdminController");
const router = express_1.default.Router();
router.get('/users', AdminController_1.adminController.getAllUsers);
router.post('/users', AdminController_1.adminController.createUser);
exports.default = router;
