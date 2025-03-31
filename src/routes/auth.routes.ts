import express from 'express';

import { authController } from '../controllers/auth.controller';
import { commonMiddleware } from '../middleware/common.middleware';
import { UserValidator } from '../validators/user.validator';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.post(
    '/register',
    commonMiddleware.isBodyValid(UserValidator.create),
    authController.register,
);
router.post(
    '/login',
    commonMiddleware.isBodyValid(UserValidator.signIn),
    authController.login,
);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post(
    '/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh,
);

router.get('/me', authMiddleware.checkAccessToken, authController.getMe);

export const authRouter = router;
