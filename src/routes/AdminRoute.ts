import express from 'express';
import { adminController } from '../controller/Admin/AdminController';

const router = express.Router();


router.get('/users', adminController.getAllUsers);


router.post('/users', adminController.createUser);

export default router;
