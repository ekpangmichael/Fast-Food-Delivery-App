import { Pool } from 'pg';
import dotenv from 'dotenv';
import configFile from '../config/config';

dotenv.config();
const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

const pool = new Pool({
  connectionString: process.env[config.use_env_variable],
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
        userid INT NOT NULL,
        orders JSONB [],
        status VARCHAR(128) NOT NULL,
        FOREIGN KEY (userid) REFERENCES users (id) ON DELETE CASCADE,
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

// create menu table  Table
const createMenu = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      menu(
        id SERIAL PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        quantity INT NOT NULL,
        price INT NOT NULL,
        imageurl VARCHAR(128) NOT NULL,
        category VARCHAR(128) NOT NULL,
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
  createMenu();
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
