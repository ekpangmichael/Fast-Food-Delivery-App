import jwt from 'jsonwebtoken';
import db from '../db/dbQuery';

const Auth = {

  async verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(403).send({ message: 'Please provide your Token' });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const queryText = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(queryText, [decoded.userId]);
      if (!rows[0]) {
        return res.status(400).send({ message: 'Invalid Token provided' });
      }
      req.user = { id: decoded.userId, isAdmin: decoded.admin };
      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

export default Auth;
