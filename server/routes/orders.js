import express from 'express';
import Orders from '../controllers/Orders';

// Express router
const router = express.Router();

// orders route
router.post('/', Orders.create);
router.get('/', Orders.getAll);
router.put('/:id', Orders.update);
router.get('/:id', Orders.getOne);
router.get('/users/:id', Orders.getHistory);
router.get('/new', Orders.getNew);

// router.get('/orders', Orders.getAll);

export default router;
