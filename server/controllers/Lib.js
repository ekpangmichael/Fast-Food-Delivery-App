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
  generateToken(id) {
    const token = jwt.sign({
      userId: id,
    }, process.env.SECRET, { expiresIn: '10d' });
    return token;
  },
};
export default Lib;
