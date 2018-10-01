import db from '../db/dbQuery';

// create orders
const Orders = {
  async create(req, res) {
    const createQuery = `INSERT INTO orders(name, userid, quantity, price, imageurl)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      req.body.name,
      req.body.userId,
      req.body.quantity,
      req.body.price,
      req.body.imgUrl,
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};


export default Orders;
