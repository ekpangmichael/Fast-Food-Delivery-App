import express from 'express';
import User from '../api/controllers/user';

// Express router
const router = express.Router();

// users route
router.post('/', User.createUser);
router.get('/', User.getAllUsers);
router.get('/:id', User.getOneUser);
router.put('/:id', User.updateUser);
router.delete('/:id', User.deleteUser);
router.post('/signin', User.userSigin);

export default router;
