import express from 'express';
import { saveDesign, loadDesigns, loadDesignById } from '../controllers/designController.js';

const router = express.Router();

// Save a design
router.post('/save', saveDesign);

// Load all designs for a user
router.get('/load/:userEmail', loadDesigns);

// Load a specific design by ID
router.get('/:designId', loadDesignById);

export default router;