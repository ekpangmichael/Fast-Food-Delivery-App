import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const createUsers = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        address VARCHAR(128) NOT NULL,
        is_admin BOOL DEFAULT 'false',
        created_date TIMESTAMP DEFAULT NOW(),
        modified_date TIMESTAMP DEFAULT NOW()
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res.command);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

// create Order Table
const createOrders = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      orders(
        id SERIAL PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        quantity INT NOT NULL,
        userID INT NOT NULL,
        price INT NOT NULL,
        imageUrl VARCHAR(128) NOT NULL,
        status VARCHAR(128) NOT NULL,
        created_date TIMESTAMP DEFAULT NOW(),
        modified_date TIMESTAMP DEFAULT NOW()
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res.command);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

// Create all tables
const createAll = () => {
  createUsers();
  createOrders();
};

const dropUsersTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users';
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

const dropOrdersTable = () => {
  const queryText = 'DROP TABLE IF EXISTS orders';
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


// drop all tables
const dropAll = () => {
  dropOrdersTable();
  dropUsersTable();
};
pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createAll,
  dropOrdersTable,
  dropAll,
};

require('make-runnable');
