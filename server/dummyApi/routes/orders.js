import express from 'express';
import Order from '../api/controllers/orders';

// Express router
const router = express.Router();

// orders route
router.post('/orders', Order.createOrders);
router.get('/orders', Order.getAllOrders);
router.get('/orders/:id', Order.getOneOrder);
router.put('/orders/:id', Order.updateOrder);
router.delete('/orders/:id', Order.deleteOrder);

export default router;
