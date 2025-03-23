import express from 'express';
import { saveDesign, loadDesigns, deleteDesign } from '../controllers/designController.js';

const router = express.Router();

// Save a design
router.post('/save', saveDesign);

// Load all designs for a user
router.get('/load/:userEmail', loadDesigns);

// Delete designs
router.delete('/delete/:designId', deleteDesign);

export default router;