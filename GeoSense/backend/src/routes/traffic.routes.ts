import { Router } from 'express';
import { getTrafficData, getRouteComparison, getCongestionHeatmap } from '../controllers/traffic.controller';

const router = Router();

// Route to get traffic data
router.get('/traffic', getTrafficData);

// Route to compare routes
router.get('/compare', getRouteComparison);

// Route to get congestion heatmap
router.get('/heatmap', getCongestionHeatmap);

export default router;