import express from 'express';
import Users from '../controllers/users';
import Auth from '../middleware/Auth';

// Express router
const router = express.Router();

// users route
router.post('/signup', Users.create);
router.post('/login', Users.login);

export default router;
