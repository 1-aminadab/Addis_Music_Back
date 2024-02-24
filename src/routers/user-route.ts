import express, { Router } from 'express';
import UserController from '../controllers/user-controller';

const router: Router = express.Router();

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);

export default router;
