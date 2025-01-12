"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class AdminController {
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield UserModel_1.default.find();
                res.status(200).json(users);
            }
            catch (error) {
                res.status(500).json({ message: 'Error fetching users', error });
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const newUser = new UserModel_1.default({
                    name,
                    email,
                    password: hashedPassword,
                });
                yield newUser.save();
                res.status(201).json(newUser);
            }
            catch (error) {
                res.status(500).json({ message: 'Error creating user', error });
            }
        });
    }
}
exports.adminController = new AdminController();
