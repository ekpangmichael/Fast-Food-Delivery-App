import express from 'express';
import bodyParser from 'body-parser';
import ordersRouter from './routes/orders';
import adminRouter from './routes/admin';
import usersRouter from './routes/users';


const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', ordersRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/users', usersRouter);

const apiDocs = {
  message: 'Welcome to fast food delivery app (api version 1) <a href="https://github.com/ekpangmichael/Fast-Food-Delivery-App">Read docs</a>',
  // orders: {
  //   '/api/v1/orders (method:GET)': 'Get all available orders ',
  //   '/api/v1/orders (method:POST)': 'Create orders ',
  //   '/api/v1/orders/:id (method:GET)': 'Get one particular order ',
  //   '/api/v1/orders/:id (method:PUT)': 'Upadate a particular order ',
  //   '/api/v1/orders/:id (method:Delete)': 'Delete a particular order ',
  // },
  // admin: {
  //   '/api/v1/admin (method:GET)': 'Get all fast food items ',
  //   '/api/v1/admin (method:POST)': 'Add fast food items ',
  //   '/api/v1/admin/:id (method:GET)': 'Get one particular fast food item ',
  //   '/api/v1/admin/:id (method:PUT)': 'Upadte a particular fast food item ',
  //   '/api/v1/admin/:id (method:Delete)': 'Delete a particular fast food item',
  // },
  // users: {
  //   '/api/v1/users (method:GET)': 'Get all registered users ',
  //   '/api/v1/users (method:POST)': 'user registration ("Name", "email", "address", "password")',
  //   '/api/v1/users/:id (method:GET)': 'Get one particular user (Expected param "id") ',
  //   '/api/v1/users/:id (method:PUT)': 'Update a user info',
  //   '/api/v1/users/:id (method:Delete)': 'Delete a particular user (Expected param "id")',
  // },

};

app.get('/', (req, res) => res.status(200).send([{ message: apiDocs }]));

app.all('*', (req, res) => res.status(404).send({
  status: 'fail',
  message: 'Route not found, try the following endpoints /api/v1/users, /api/v1/admin, or /api/v1/orders, ',
}));

const server = app.listen(process.env.PORT || 8000);

export { app, server };

//console.log('app running on port ', 8000);
