import express from 'express';
import Orders from '../controllers/orders';

// Express router
const router = express.Router();

// orders route
router.post('/orders', Orders.create);
router.get('/orders', Orders.getAll);

export default router;
