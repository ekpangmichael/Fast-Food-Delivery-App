export default {
  signUp: {
    // res.statusCode === 201
    fullDetails: {
      password: 'bisongetta',
      email: 'user001@mail.com',
      name: 'test user',
      address: 'earth',
    },
    
    // res.body.message === "Invalid credentials supplied"
    // res.statusCode === 400
    nullEmail: {
      password: 'user001',
      name: 'usersfirstname',
      address: 'userslastname',
    },
  },

  // user sign in
  signIn: {

    // status code === 400
    // message === invalid credentials supplied

    nullPassword: {
      email: 'user001@gmail.com',
    },
    adminLogin: {
      password: 'bisongetta',
      email: 'mike@gmail.com',
    },
    // status code 400
    // message invalide email
    invalidEmail: {
      email: 'user00gmail.com',
    },

    invalidPassword: {
      email: 'user001@mail.com',
      password: 'bisongett',

    },
    // status code === 200
    // message === user signin is successful
    fullSigninDetails: {
      email: 'user001@mail.com',
      password: 'bisongetta',
    },

    wrongSigninDetails: {
      email: 'us1@mail.com',
      password: 'bisongetta',
    },
  },

};
