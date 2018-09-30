import db from '../db/dbQuery';

const date = new Date();

const Orders = {
  async create(req, res) {
    const text = `INSERT INTO orders(name)
      VALUES($1)
      returning *`;
    const values = [
      req.body.name,
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM orders';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async getOne(req, res) {
    const text = 'SELECT * FROM orders WHERE id = $1';
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'orders not found' });
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};


export default Orders;
