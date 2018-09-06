'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _orders = require('./api/controllers/orders');

var _orders2 = _interopRequireDefault(_orders);

var _admin = require('./api/controllers/admin');

var _admin2 = _interopRequireDefault(_admin);

var _user = require('./api/controllers/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.json());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

// order route
app.post('/api/v1/orders', _orders2.default.createOrders);
app.get('/api/v1/orders', _orders2.default.getAllOrders);
app.get('/api/v1/orders/:id', _orders2.default.getOneOrder);
app.put('/api/v1/orders/:id', _orders2.default.updateOrder);
app.delete('/api/v1/orders/:id', _orders2.default.deleteOrder);

// admin route
app.post('/api/v1/admin', _admin2.default.createFoodItems);
app.get('/api/v1/admin', _admin2.default.getAllFoodItems);
app.get('/api/v1/admin/:id', _admin2.default.getOneItem);
app.put('/api/v1/admin/:id', _admin2.default.updateItem);
app.delete('/api/v1/admin/:id', _admin2.default.deleteItem);

// users route
app.post('/api/v1/users', _user2.default.createUser);
app.get('/api/v1/users', _user2.default.getAllUsers);
app.get('/api/v1/users/:id', _user2.default.getOneUser);
app.put('/api/v1/users/:id', _user2.default.updateUser);
app.delete('/api/v1/users/:id', _user2.default.deleteUser);
app.post('/api/v1/users/signin', _user2.default.userSigin);

var apiDocs = {
  orders: {
    '/api/v1/orders (method:GET)': 'Get all available orders ',
    '/api/v1/orders (method:POST)': 'Create orders ',
    '/api/v1/orders/:id (method:GET)': 'Get one particular order ',
    '/api/v1/orders/:id (method:PUT)': 'Upadate a particular order ',
    '/api/v1/orders/:id (method:Delete)': 'Delete a particular order '
  },
  admin: {
    '/api/v1/admin (method:GET)': 'Get all fast food items ',
    '/api/v1/admin (method:POST)': 'Add fast food items ',
    '/api/v1/admin/:id (method:GET)': 'Get one particular fast food item ',
    '/api/v1/admin/:id (method:PUT)': 'Upadte a particular fast food item ',
    '/api/v1/admin/:id (method:Delete)': 'Delete a particular fast food item'
  },
  users: {
    '/api/v1/users (method:GET)': 'Get all registered users ',
    '/api/v1/users (method:POST)': 'user registration (Expected params "userName":", "userEmail",  "userAddress", "userPassword") ',
    '/api/v1/users/:id (method:GET)': 'Get one particular user (Expected param "id") ',
    '/api/v1/users/:id (method:PUT)': 'Update a user info',
    '/api/v1/users/:id (method:Delete)': 'Delete a particular user (Expected param "id")'
  }

};

app.get('/', function (req, res) {
  return res.status(200).send([{ message: apiDocs }]);
});

app.listen(3000);

exports.default = app;

console.log('app running on port ', 3000);