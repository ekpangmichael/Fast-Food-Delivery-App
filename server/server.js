import express from 'express';
import 'babel-polyfill';
import ordersRouter from './routes/orders';
import adminRouter from './routes/admin';
import usersRouter from './routes/users';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handling CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Method', 'PUT', 'POST', 'PATCH', 'DELETE', 'GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/api/v1/orders', ordersRouter);
app.use('/api/v1/orders/new', ordersRouter);
app.use('/api/v1/menu', adminRouter);
// app.use('/api/v1/users', usersRouter);
app.use('/api/v1/auth', usersRouter);

const apiDocs = {
  message: 'Welcome to fast food delivery app (api version 1)',
};

app.get('/', (req, res) => res.status(200).send([{ message: apiDocs }]));

app.all('*', (req, res) => res.status(404).send({
  status: 'fail',
  message: 'Route not found, try the following endpoints /api/v1/users, /api/v1/admin, or /api/v1/orders, ',
}));

const server = app.listen(process.env.PORT || 8000);

export { app, server };

//console.log('app running on port ', 8000);
