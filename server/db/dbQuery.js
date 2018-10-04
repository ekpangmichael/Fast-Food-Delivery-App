import { Pool } from 'pg';
import dotenv from 'dotenv';
import configFile from '../config/config';

dotenv.config();
const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

const pool = new Pool({
  connectionString: process.env[config.use_env_variable],
});

export default {

  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
