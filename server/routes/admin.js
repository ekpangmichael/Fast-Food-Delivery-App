import express from 'express';
import Admin from '../controllers/admin';
import Auth from '../middleware/Auth';

// Express router
const router = express.Router();

// admin route
router.post('/', Auth.verifyToken, Admin.create);
router.get('/', Admin.getAll);
router.get('/:id', Auth.verifyToken, Admin.getOne);
//router.put('/:id', Auth.verifyToken, Admin.update);
router.delete('/:id', Auth.verifyToken, Admin.delete);

export default router;
