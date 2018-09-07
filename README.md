# Fast Food Delivery App
[![Build Status](https://travis-ci.org/ekpangmichael/Fast-Food-Delivery-App.svg?branch=develop)](https://travis-ci.org/ekpangmichael/Fast-Food-Delivery-App)
[![Coverage Status](https://coveralls.io/repos/github/ekpangmichael/Fast-Food-Delivery-App/badge.png?branch=production)](https://coveralls.io/github/ekpangmichael/Fast-Food-Delivery-App?branch=production)

API endpoint for a fast food delivery app, created using node and express with non-persistent data storage

Repo branches
-------------

*   `Master` \- The master branch. Nothing much is here
*   `Production` \- This branch contains the compiled code and is hosted on heroku
*   `Develop` - Develop branch was used for development and testing of features - code is written in ES6
*   `Feature` This branch contains the UI pages for the font-end
    
    API Documentation
    -----------------
    
    The api has the following endpoints
    
    ### Orders Routes
    
    *   `/api/v1/orders (method:GET)` Get all available orders
    *   `/api/v1/orders (method:POST)` Place orders `(Expected params "userId:", "orderId:", "orderName:", "imgUrl:","quantity:", "price:")`
    *   `/api/v1/orders/:id (method:GET)` Get one particular order `(Expected params "id:")`
    *   `/api/v1/orders/:id (method:PUT)` Update a particular order `(Expected params "id:" and body)`
    *   `/api/v1/orders/:id (method:Delete)` Delete a particular order `(Expected params "id:")`
    
    ### Admin Routes
    
    *   `/api/v1/admin (method:GET)` Get all fast food items
    *   `/api/v1/admin (method:POST)` Add fast food items `(Expected params "foodName:", "imgUrl:", "category:","quantity:","price:")`
    *   `/api/v1/admin/:id (method:GET)` Get one particular fast food item `(Expected params "id:")`
    *   `/api/v1/admin/:id (method:PUT)` Update a particular fast food item `(Expected params "id:" and body)`
    *   `/api/v1/admin/:id (method:Delete)`
    Delete a particular fast food item `(Expected params "id:")`
    
    ### Users Routes
    
    *   `/api/v1/users (method:GET)` Get all registered users
    *   `/api/v1/users (method:POST)` user registration `(Expected params "userName", "userEmail", "userAddress", "userPassword")`
    *   `/api/v1/users/:id (method:GET)` Get one particular user `(Expected param "id")`
    *   `/api/v1/users/:id (method:PUT)` Update a user's info `(Expected params "id" and body)`
    *   `/api/v1/users/:id (method:Delete)` Delete a particular user `(Expected param "id")`
    *   `/api/v1/users/signin (method:POST)` User signin `(Expected params "userEmail", and "userPassword")`