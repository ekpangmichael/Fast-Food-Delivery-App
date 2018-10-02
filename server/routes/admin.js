import express from 'express';
import Admin from '../controllers/admin';

// Express router
const router = express.Router();

// admin route
router.post('/', Admin.create);
router.get('/', Admin.getAll);
router.get('/:id', Admin.getOne);
router.put('/:id', Admin.update);
router.delete('/:id', Admin.delete);

export default router;
