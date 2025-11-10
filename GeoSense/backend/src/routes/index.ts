import express from 'express';
import trafficRoutes from './traffic.routes';
import poiRoutes from './poi.routes';

const router = express.Router();

// Main route for traffic data
router.use('/traffic', trafficRoutes);

// Main route for points of interest
router.use('/poi', poiRoutes);

export default router;