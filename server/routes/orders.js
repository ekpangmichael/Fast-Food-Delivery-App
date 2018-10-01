import express from 'express';
import Orders from '../controllers/Orders';

// Express router
const router = express.Router();

// orders route
router.post('/', Orders.create);
// router.get('/orders', Orders.getAll);

export default router;
