import express from 'express';
import Admin from '../controllers/admin';

// Express router
const router = express.Router();

// admin route
router.post('/', Admin.createFoodItems);
router.get('/', Admin.getAllFoodItems);
router.get('/:id', Admin.getOneItem);
router.put('/:id', Admin.updateItem);
router.delete('/:id', Admin.deleteItem);

export default router;
