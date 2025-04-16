import express from 'express';

import { authMiddleware } from '../middleware/auth.middleware';
import { groupController } from '../controllers/group.controller';
import { checkUniqueMiddleware } from '../middleware/uniqueGroup.middleware';

const router = express.Router();

router.get('/', authMiddleware.checkAccessToken, groupController.getAll);

router.get(
    '/:groupId',
    authMiddleware.checkAccessToken,
    groupController.getById,
);

router.post(
    '/',
    authMiddleware.checkAccessToken,
    checkUniqueMiddleware.group,
    groupController.post,
);

router.patch(
    '/:groupId',
    authMiddleware.checkAccessToken,
    groupController.update,
);

router.delete(
    '/:groupId',
    authMiddleware.checkAccessToken,
    groupController.delete,
);

export const groupRouter = router;
