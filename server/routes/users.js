import express from 'express';
import Users from '../api/controllers/Users';
import Auth from '../api/middleware/Auth';

// Express router
const router = express.Router();

// users route
// router.post('/', User.createUser);
// router.get('/', User.getAllUsers);
// router.get('/:id', User.getOneUser);
// router.put('/:id', User.updateUser);
// router.delete('/:id', User.deleteUser);
// router.post('/signin', User.userSigin);
// new routes
router.post('/signup', Users.create);
router.post('/login', Users.login);


export default router;
