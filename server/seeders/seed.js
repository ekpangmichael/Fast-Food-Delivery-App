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
    address
)
VALUES
    (
        'Ekpang Michael',
        'weezyval93@gmail.com',
        'bisongetta',
        'mushin lagos'
    ),
    (
        'Will smith',
        'will@gmail.com',
        'bisongetta',
        'mushin lagos'
    ),
    (
        'john Doe',
        'john@gmail.com',
        'bisongetta',
        'mushin lagos'
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
