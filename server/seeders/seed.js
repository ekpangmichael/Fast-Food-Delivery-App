import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const date = new Date();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const seedUsers = () => {
  const queryText =
    `INSERT INTO users (
    name,
    email,
    password,
    address,
    is_admin 
)
VALUES
    (
        'Ekpang Michael',
        'mike@gmail.com',
        'bisongetta',
        'mushin lagos',
        'true'
    )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

module.exports = {
  seedUsers,
};

require('make-runnable');
