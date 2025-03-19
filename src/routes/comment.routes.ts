import express from 'express';

import { authMiddleware } from '../middleware/auth.middleware';
import { commentController } from '../controllers/comment.controller';

const router = express.Router();

router.post(
    '/:orderId',
    authMiddleware.checkAccessToken,
    commentController.post,
);
router.get(
    '/:commentId',
    authMiddleware.checkAccessToken,
    commentController.getById,
);
router.patch(
    '/:commentId',
    authMiddleware.checkAccessToken,
    commentController.update,
);

router.delete(
    '/:commentId',
    authMiddleware.checkAccessToken,
    commentController.delete,
);

export const commentRouter = router;
