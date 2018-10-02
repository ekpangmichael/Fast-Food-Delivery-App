import db from '../db/dbQuery';

// create orders
const foodMenu = {
  async create(req, res) {
    const createQuery = `INSERT INTO menu(name, category, quantity, price, imageurl)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      req.body.name,
      req.body.category,
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
  // Get all available menu
  async getAll(req, res) {
    const findAll = 'SELECT * FROM menu';
    try {
      const { rows, rowCount } = await db.query(findAll);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  // Edit meal options
  async update(req, res) {
    const findOne = 'SELECT * FROM menu WHERE id=$1';
    const updateQuery = `UPDATE menu
      SET name=$1,quantity=$2,price=$3,category=$4,imageurl=$5
      WHERE id=$6 returning *`;
    try {
      const { rows } = await db.query(findOne, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'menu not found' });
      }
      const values = [
        req.body.name || rows[0].name,
        req.body.quantity || rows[0].quantity,
        req.body.price || rows[0].price,
        req.body.category || rows[0].category,
        req.body.imgUrl || rows[0].imageurl,
        req.params.id,
      ];
      const response = await db.query(updateQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  // delete a menu item
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM menu WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'menu not found' });
      }
      return res.status(204).send({ message: 'deleted' });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

export default foodMenu;
