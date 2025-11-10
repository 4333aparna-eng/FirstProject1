import { Request, Response } from 'express';
import { POI } from '../models/poi.entity';
import { getPOIs, createPOI, updatePOI, deletePOI } from '../services/poi.service';

// Get all Points of Interest
export const getAllPOIs = async (req: Request, res: Response) => {
    try {
        const pois = await getPOIs();
        res.status(200).json(pois);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving POIs', error });
    }
};

// Create a new Point of Interest
export const addPOI = async (req: Request, res: Response) => {
    try {
        const newPOI: POI = req.body;
        const createdPOI = await createPOI(newPOI);
        res.status(201).json(createdPOI);
    } catch (error) {
        res.status(500).json({ message: 'Error creating POI', error });
    }
};

// Update an existing Point of Interest
export const modifyPOI = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedPOI: POI = req.body;
        const result = await updatePOI(id, updatedPOI);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'POI not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating POI', error });
    }
};

// Delete a Point of Interest
export const removePOI = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await deletePOI(id);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'POI not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting POI', error });
    }
};