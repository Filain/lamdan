import express from 'express';

import { authMiddleware } from '../middleware/auth.middleware';
import { adminController } from '../controllers/admin.controller';
import { roleMiddleware } from '../middleware/role.middleware';

const router = express.Router();

router.get('/', authMiddleware.checkAccessToken, adminController.getAll);
router.get(
    '/statistics',
    authMiddleware.checkAccessToken,
    roleMiddleware.isAdmin,
    adminController.getStatistics,
);

router.patch('/set-password', adminController.setPassword);

router.patch(
    '/ban/:userId',
    authMiddleware.checkAccessToken,
    roleMiddleware.isAdmin,
    adminController.banUser,
);
router.patch(
    '/unban/:userId',
    authMiddleware.checkAccessToken,
    roleMiddleware.isAdmin,
    adminController.unbanUser,
);
router.post(
    '/get-active/:userId',
    authMiddleware.checkAccessToken,
    roleMiddleware.isAdmin,
    adminController.getActivationToken,
);

router.post(
    '/create',
    authMiddleware.checkAccessToken,
    roleMiddleware.isAdmin,
    adminController.create,
);

export const adminRouter = router;
