import express from 'express';
import Orders from '../controllers/orders';
import Auth from '../middleware/Auth';

// Express router
const router = express.Router();

// orders route
router.post('/', Auth.verifyToken, Orders.create);
router.get('/', Auth.verifyToken, Orders.getAll);
router.put('/:id', Auth.verifyToken, Orders.update);
router.get('/:id', Auth.verifyToken, Orders.getOne);
router.get('/users/:id', Auth.verifyToken, Orders.getHistory);
router.get('/new', Auth.verifyToken, Orders.getNew);

// router.get('/orders', Orders.getAll);

export default router;
