import express from 'express';

import { orderController } from '../controllers/order.controller';

const router = express.Router();

router.get('/', orderController.getAll);
router.post('/');
router.patch('/');
router.get('/:orderId');
router.delete('/:orderId');

export const orderRouter = router;
