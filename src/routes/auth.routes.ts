import express from 'express';

import { authController } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', authController.registerUser);
router.get('/test', authController.test);

export const authRouter = router;
