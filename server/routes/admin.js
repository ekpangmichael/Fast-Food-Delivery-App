import express from 'express';
import Admin from '../controllers/Admin';

// Express router
const router = express.Router();

// admin route
router.post('/', Admin.create);
// router.get('/', Admin.getAllFoodItems);
// router.get('/:id', Admin.getOneItem);
// router.put('/:id', Admin.updateItem);
// router.delete('/:id', Admin.deleteItem);

export default router;
