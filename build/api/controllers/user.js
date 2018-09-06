'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _users = require('../model/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Oder object
var User = {

  // Register User
  createUser: function createUser(req, res) {
    if (!req.body.userName || !req.body.userEmail || !req.body.userPassword || !req.body.userAddress) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    var checkUser = _users2.default.userExistEmail(req.body.userEmail);
    if (checkUser) {
      return res.status(400).send({ message: 'Email already Taken!' });
    }
    var user = _users2.default.userRegistration(req.body);
    return res.status(201).send([{ message: 'Registration successful' }, { users: user }]);
  },

  // get all available orders

  getAllUsers: function getAllUsers(req, res) {
    var userMesage = '';
    var users = _users2.default.findAllUsers();
    if (users.length === 0) {
      userMesage = 'No registered Users';
    } else {
      userMesage = 'successful';
    }
    return res.status(200).send([{ message: userMesage }, { user: users }]);
  },

  // get a partcular user

  getOneUser: function getOneUser(req, res) {
    var user = _users2.default.findOneUser(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.status(200).send([{ message: 'User found successfully' }, user]);
  },
  userSigin: function userSigin(req, res) {
    var pass = req.body.userPassword;
    var user = _users2.default.userSigin(req.body.userEmail);
    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }
    return _bcrypt2.default.compare(pass, user.userPassword).then(function (result) {
      if (result === true) {
        return res.status(200).send([{ message: 'User login successfully' }, { users: user }]);
      }
      return res.status(200).send({ message: 'Incorrect password' });
    });
  },


  //  update a particular user
  updateUser: function updateUser(req, res) {
    var user = _users2.default.findOneUser(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }
    var updatedUser = _users2.default.updateUser(req.params.id, req.body);
    return res.status(200).send([{ message: 'user updated successfully' }, updatedUser]);
  },


  // deleta a particular user
  deleteUser: function deleteUser(req, res) {
    var user = _users2.default.findOneUser(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }
    var ref = _users2.default.deleteUser(req.params.id);
    return res.status(204).send([{ message: 'user deleted successfully' }, ref]);
  }
};

exports.default = User;