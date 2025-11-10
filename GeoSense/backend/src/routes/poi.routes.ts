import { Router } from 'express';
import { getAllPOIs, getPOIById, createPOI, updatePOI, deletePOI } from '../controllers/poi.controller';

const router = Router();

// Route to get all points of interest
router.get('/', getAllPOIs);

// Route to get a specific point of interest by ID
router.get('/:id', getPOIById);

// Route to create a new point of interest
router.post('/', createPOI);

// Route to update an existing point of interest
router.put('/:id', updatePOI);

// Route to delete a point of interest
router.delete('/:id', deletePOI);

export default router;