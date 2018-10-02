import db from '../db/dbQuery';

const processing = 'New';

// create orders
const Orders = {
  async create(req, res) {
    const createQuery = `INSERT INTO orders(name, userid, quantity, price, imageurl, status)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
    const values = [
      req.body.name,
      req.body.userId,
      req.body.quantity,
      req.body.price,
      req.body.imgUrl,
      processing,
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  // get order history
  async getHistory(req, res) {
    const createQuery = 'SELECT * FROM orders WHERE userid = $1';
    try {
      const { rows } = await db.query(createQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'you have not placed any orders' });
      }
      return res.status(200).send([{ status: 'successful' }, { rows }]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  // Get all recent orders
  async getNew(req, res) {
    const findRecent = 'SELECT * FROM orders WHERE status = $1';
    try {
      const { rows, rowCount } = await db.query(findRecent, [processing]);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  // Get all orders
  async getAll(req, res) {
    const findAll = 'SELECT * FROM orders';
    try {
      const { rows, rowCount } = await db.query(findAll);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  // Get a specific order
  async getOne(req, res) {
    const queryOne = 'SELECT * FROM orders WHERE id = $1';
    try {
      const { rows } = await db.query(queryOne, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'orders not found' });
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },


  // update order status
  async update(req, res) {
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
