import express from 'express';
import bodyParser from 'body-parser';
import Order from './api/controllers/orders';
import Admin from './api/controllers/admin';
import User from './api/controllers/user';


const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// order route
app.post('/api/v1/orders', Order.createOrders);
app.get('/api/v1/orders', Order.getAllOrders);
app.get('/api/v1/orders/:id', Order.getOneOrder);
app.put('/api/v1/orders/:id', Order.updateOrder);
app.delete('/api/v1/orders/:id', Order.deleteOrder);

// admin route
app.post('/api/v1/admin', Admin.createFoodItems);
app.get('/api/v1/admin', Admin.getAllFoodItems);
app.get('/api/v1/admin/:id', Admin.getOneItem);
app.put('/api/v1/admin/:id', Admin.updateItem);
app.delete('/api/v1/admin/:id', Admin.deleteItem);

// users route
app.post('/api/v1/users', User.createUser);
app.get('/api/v1/users', User.getAllUsers);
app.get('/api/v1/users/:id', User.getOneUser);
app.put('/api/v1/users/:id', User.updateUser);
app.delete('/api/v1/users/:id', User.deleteUser);
app.post('/api/v1/users/signin', User.userSigin);


const apiDocs = {
  orders: {
    '/api/v1/orders (method:GET)': 'Get all available orders ',
    '/api/v1/orders (method:POST)': 'Create orders ',
    '/api/v1/orders/:id (method:GET)': 'Get one particular order ',
    '/api/v1/orders/:id (method:PUT)': 'Upadate a particular order ',
    '/api/v1/orders/:id (method:Delete)': 'Delete a particular order ',
  },
  admin: {
    '/api/v1/admin (method:GET)': 'Get all fast food items ',
    '/api/v1/admin (method:POST)': 'Add fast food items ',
    '/api/v1/admin/:id (method:GET)': 'Get one particular fast food item ',
    '/api/v1/admin/:id (method:PUT)': 'Upadte a particular fast food item ',
    '/api/v1/admin/:id (method:Delete)': 'Delete a particular fast food item',
  },
  users: {
    '/api/v1/users (method:GET)': 'Get all registered users ',
    '/api/v1/users (method:POST)': 'user registration (Expected params "userName":", "userEmail",  "userAddress", "userPassword") ',
    '/api/v1/users/:id (method:GET)': 'Get one particular user (Expected param "id") ',
    '/api/v1/users/:id (method:PUT)': 'Update a user info',
    '/api/v1/users/:id (method:Delete)': 'Delete a particular user (Expected param "id")',
  },

};

app.get('/', (req, res) => res.status(200).send([{ message: apiDocs }]));

const server = app.listen(process.env.PORT || 3000);

export { app, server };

//console.log('app running on port ', 8000);
