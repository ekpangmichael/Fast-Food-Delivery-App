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

### Order endpoints `/api/v1/auth/`

| method | route            | description          | data                                                    |
| ------ | ---------------- | -------------------- | --------------------------------------------------------|
| POST   | /signup          | Register a user      |  `{email, password, address, name}`                     |
| POST   | /login           | Login a user         | `{email, password}`                                     |

 

### Admin endpoints `/api/v1/orders`

| method | route             | description                  | data                                                    |
| ------ | ------------------|------------------------------|---------------------------------------------------------|
| GET    | /orders           | Get all orders               |                                                         |
| POST   | /orders           | Place an order for food      | `{userid, orders[]`                                      |
| GET    | /orders/users/:id | Get the order history(user)  | `{id}`                                                  |
| GET    | /orders/:id       | Get a specific order         | `{id}`                                                  |
| PUT    | /orders/:id       | Update the status of an order| `{id}`                                                  |

    
### Users endpoints `/api/v1/menu`

| method | route           | description                   | data                                                   |
| ------ | ----------------|-------------------------------| -------------------------------------------------------|
| GET    | /menu           | Get available menu            |                                                        |
| POST   | /menu           | Add a meal option to the menu | `{name, category, price, quantity, price}`             |
