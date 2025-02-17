import express from 'express';

import { exelController } from '../controllers/exel.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', authMiddleware.checkAccessToken, exelController.exportToExcel);

export const exelRouter = router;
