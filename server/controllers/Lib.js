import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const Lib = {
  encryptPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  generateToken(id, isAdmin) {
    const token = jwt.sign({
      userId: id,
      admin: isAdmin,
    }, process.env.SECRET, { expiresIn: '10d' });
    return token;
  },
  isNumber(id) {
    const parseID = parseInt(id);
    return Number.isInteger(parseID);
  },
};
export default Lib;
