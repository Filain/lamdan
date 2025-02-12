import express from 'express';

import { orderController } from '../controllers/order.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', authMiddleware.checkAccessToken, orderController.getAll);
router.post('/', authMiddleware.checkAccessToken, orderController.post);
router.patch(
    '/:orderId',
    authMiddleware.checkAccessToken,
    orderController.update,
);
router.get(
    '/:orderId',
    authMiddleware.checkAccessToken,
    orderController.getById,
);
router.delete(
    '/:orderId',
    authMiddleware.checkAccessToken,
    orderController.delete,
);

export const orderRouter = router;
