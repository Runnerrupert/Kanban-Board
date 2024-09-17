import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();
// routes for /auth and /api, /api uses the authenticationToken for security
router.use('/auth', authRoutes);
router.use('/api', authenticateToken, apiRoutes);

export default router;
