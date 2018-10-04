import db from '../db/dbQuery';
import Lib from './Lib';

const processing = 'New';

// create orders
const Orders = {
  async create(req, res) {
    const createQuery = `INSERT INTO orders(userid, orders, status)
      VALUES($1, $2, $3)
      returning *`;
    const values = [
      req.body.userId,
      req.body.orders,
      processing,
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send([{ status: 'fail' }, { message: 'Invalid Parameters' }]);
    }
  },
  // get order history
  async getHistory(req, res) {
    if (req.params.id < 1) {
      return res.status(400).send({ message: 'id cannot have a negative sign' });
    }

    const checkNumber = Lib.isNumber(req.params.id);
    if (!checkNumber) {
      return res.status(400).send({ message: 'Only numbers are allow' });
    }
    const createQuery = 'SELECT * FROM orders WHERE userid = $1';
    try {
      const { rows } = await db.query(createQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'No order found' });
      }
      return res.status(200).send([{ status: 'successful' }, { rows }]);
    } catch (error) {
      return res.status(400).send([{ status: 'fail' }, { message: 'Invalid Parameters' }]);
    }
  },

  // Get all recent orders
  async getNew(req, res) {
    const findRecent = 'SELECT * FROM orders WHERE status = $1';
    try {
      const { rows, rowCount } = await db.query(findRecent, [processing]);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send([{ status: 'fail' }, { message: 'Invalid Parameters' }]);
    }
  },

  // Get all orders
  async getAll(req, res) {
    if (req.user.isAdmin === false) {
      return res.status(403).send({ message: 'Only admin can access this route' });
    }

    const findAll = 'SELECT * FROM orders';
    try {
      const { rows, rowCount } = await db.query(findAll);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send([{ status: 'fail' }, { message: 'Invalid Parameters' }]);
    }
  },

  // Get a specific order
  async getOne(req, res) {
    if (req.user.isAdmin === false) {
      return res.status(403).send({ message: 'Only admin can access this route' });
    }

    if (req.params.id < 1) {
      return res.status(400).send({ message: 'id cannot have a negative sign' });
    }

    const checkNumber = Lib.isNumber(req.params.id);
    if (!checkNumber) {
      return res.status(400).send({ message: 'Only numbers are allow' });
    }

    const queryOne = 'SELECT * FROM orders WHERE id = $1';
    try {
      const { rows } = await db.query(queryOne, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'orders not found' });
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send([{ status: 'fail' }, { message: 'Invalid Parameters' }]);
    }
  },


  // update order status
  async update(req, res) {
    if (req.user.isAdmin === false) {
      return res.status(403).send({ message: 'Only admin can access this route' });
    }
    if (req.params.id < 1) {
      return res.status(400).send({ message: 'id cannot have a negative sign' });
    }

    const checkNumber = Lib.isNumber(req.params.id);
    if (!checkNumber) {
      return res.status(400).send({ message: 'Only numbers are allow' });
    }
    if (!req.body.status) {
      return res.status(400).send([{ status: 'fail' }, { message: 'status is empty' }]);
    }

    const queryOne = 'SELECT * FROM orders WHERE id=$1';
    const updateQuery = `UPDATE orders
      SET status=$1 WHERE id=$2 returning *`;
    try {
      const { rows } = await db.query(queryOne, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'orders not found' });
      }
      const values = [
        req.body.status,
        req.params.id,
      ];
      const response = await db.query(updateQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  },
};

export default Orders;
