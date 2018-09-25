# Fast Food Delivery App
> Fast-Food delivery app for a restaurant.

[![Build Status](https://travis-ci.org/ekpangmichael/Fast-Food-Delivery-App.svg?branch=develop)](https://travis-ci.org/ekpangmichael/Fast-Food-Delivery-App)
[![Coverage Status](https://coveralls.io/repos/github/ekpangmichael/Fast-Food-Delivery-App/badge.png?branch=develop)](https://coveralls.io/github/ekpangmichael/Fast-Food-Delivery-App?branch=develop) [![Test Coverage](https://api.codeclimate.com/v1/badges/f146d9a754eb2083cabc/test_coverage)](https://codeclimate.com/github/ekpangmichael/Fast-Food-Delivery-App/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/f146d9a754eb2083cabc/maintainability)](https://codeclimate.com/github/ekpangmichael/Fast-Food-Delivery-App/maintainability)

## Introduction
API endpoint for a fast food delivery app, created using node and express with non-persistent data storage


## Getting Started

```bash
$ git clone https://github.com/ekpangmichael/Fast-Food-Delivery-App.git
$ cd Fast-Food-Delivery-App

$ npm install
$ npm run dev-start - to start the development server
```

## To run Test

```bash
$ npm run test
```

## To run code Coverage

```bash
$ npm run coverage
```
## To run build

```bash
$ npm run build
```

## API Documentation
> The Api is hosted on heroku URL https://fast-food-api.herokuapp.com/

### Order endpoints `/api/v1/orders`

| method | route            | description          | data                                                    |
| ------ | ---------------- | -------------------- | --------------------------------------------------------|
| GET    | /orders          | Get all users orders |                                                         |
| POST   | /orders/         | Place an order       | `{userId, orderId, orderName, imgUrl, quantity, price}` |
| GET    | /orders/:id      | Get an order         | `{id}`                                                  |
| PUT    | /orders/:id      | Update order status  | `{id, body}`                                            |
| DELETE | /orders/:id      | Delete an order      | `{id}`                                                  |
 

### Admin endpoints `/api/v1/admin`

| method | route           | description            | data                                                    |
| ------ | ----------------|------------------------| --------------------------------------------------------|
| GET    | /admin          | Get all fast food items|                                                         |
| POST   | /admin/         | Add fast food items    | `{foodName, imgUrl, category, quantity, price}`         |
| GET    | /admin/:id      | Get one fast food item | `{id}`                                                  |
| PUT    | /admin/:id      | Update a fast food item| `{id, body}`                                            |
| DELETE | /admin/:id      | Delete a fast food item| `{id}`                                                  |

    
### Users endpoints `/api/v1/users`

| method | route           | description               | data                                                  |
| ------ | ----------------|-------------------------- | ------------------------------------------------------|
| GET    | /users          | Get all registered users  |                                                       |
| POST   | /users/         | User registration         | `{name, email, address, password}`    |
| POST   | /users/signin   | User login                | `{email, password}`                           |
| GET    | /users/:id      | Get one user              | `{id}`                                                |
| PUT    | /users/:id      | Update a user             | `{id, body}`                                          |
| DELETE | /users/:id      | Delete a users            | `{id}`                                                |