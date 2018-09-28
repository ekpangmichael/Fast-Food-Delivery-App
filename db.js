import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('database connected!');
});


// Create Orders Table

const createOrdersTable = () => {
  const queryData =
      `CREATE TABLE IF NOT EXISTS
      orders(
        id  PRIMARY KEY,
        userId integer NOT NULL,
        orderId integer NOT NULL,
        orderName VARCHAR(128) NOT NULL,
        imgUrl VARCHAR(128) NOT NULL,
        quantity integer NOT NULL,
        price integer NOT NULL
      )`;

  pool.query(queryData)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


// Create User Table
  const queryData =
    `CREATE TABLE IF NOT EXISTS
      users(
        id  PRIMARY KEY,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        name VARCHAR(128) NOT NULL,
      )`;

  pool.query(queryData)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

// Drop orders Table
 
const dropOrdersTable = () => {
  const queryData = 'DROP TABLE IF EXISTS orders returning *';
  pool.query(queryData)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

// Drop User Table
 
const dropUserTable = () => {
  const queryData = 'DROP TABLE IF EXISTS users returning *';
  pool.query(queryData)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

// Create All Tables

const createAllTables = () => {
  createUserTable();
  createOrdersTable();
}

 // Drop All Tables

const dropAllTables = () => {
  dropUserTable();
  dropOrdersTable();
}

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


module.exports = {
  createOrders,
  createUserTable,
  createAllTables,
  dropUserTable,
  dropOrdersTable,
  dropAllTables
};

require('make-runnable');