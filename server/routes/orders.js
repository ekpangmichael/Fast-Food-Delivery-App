import express from 'express';
import Orders from '../api/controllers/orders';

// Express router
const router = express.Router();

// orders route
router.post('/orders', Orders.create);
router.get('/orders', Orders.getAll);
//router.post('/orders', Order.createOrders);
//router.get('/orders', Order.getAllOrders);
//router.get('/orders/:id', Order.getOneOrder);
//router.put('/orders/:id', Order.updateOrder);
//router.delete('/orders/:id', Order.deleteOrder);

export default router;
