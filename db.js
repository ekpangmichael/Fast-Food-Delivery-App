import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// create an instance of pool
const pool = new Pool({
  connectionURL: process.env.DATABASE_URL,
});

// listen to connect event
pool.on('connect', () => {
  console.log('database connected');
});


const createTables = () => {
  const queryData =
      `CREATE TABLE IF NOT EXISTS
      ordersDB(
        id UUID PRIMARY KEY,
        userId VARCHAR(128) NOT NULL,
        orderId UUID NOT NULL,
        orderName VARCHAR(128) NOT NULL,
        imgUrl VARCHAR(128) NOT NULL,
        quantity integer NOT NULL,
        price integer NOT NULL,
        OrderDate TIMESTAMP,
        modifiedDate TIMESTAMP
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

// Drop Tables
const dropTables = () => {
  const queryData = 'DROP TABLE IF EXISTS ordersDB';
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

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables,
};
