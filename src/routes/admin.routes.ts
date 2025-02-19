import express from 'express';

import { authMiddleware } from '../middleware/auth.middleware';
import { adminController } from '../controllers/admin.controller';

const router = express.Router();

router.get('/', authMiddleware.checkAccessToken, adminController.getAll);
router.get(
    '/statistics',
    authMiddleware.checkAccessToken,
    adminController.getStatistics,
);
router.patch(
    '/ban/:userId',
    authMiddleware.checkAccessToken,
    adminController.banUser,
);
router.patch(
    '/unban/:userId',
    authMiddleware.checkAccessToken,
    adminController.unbanUser,
);
router.post(
    '/get-active/:userId',
    authMiddleware.checkAccessToken,
    adminController.getActivationToken,
);
router.post('/activate/:token', adminController.activate);

router.patch(
    '/:userId',
    authMiddleware.checkAccessToken,
    adminController.changePassword,
);

export const adminRouter = router;
