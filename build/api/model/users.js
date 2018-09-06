'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var saltRounds = 10;

var User = function () {
  //  class constructor
  function User() {
    _classCallCheck(this, User);

    this.users = [];
  }

  //  returns orders object

  _createClass(User, [{
    key: 'userRegistration',
    value: function userRegistration(data) {
      var newUser = {
        id: _uuid2.default.v4(),
        userName: data.userName || '',
        userEmail: data.userEmail || '',
        userAddress: data.userAddress || '',
        userPassword: _bcrypt2.default.hashSync(data.userPassword, saltRounds) || '',
        regDate: _moment2.default.now(),
        modifiedDate: _moment2.default.now()
      };
      this.users.push(newUser);
      return newUser;
    }

    //  returns a particular user

  }, {
    key: 'findOneUser',
    value: function findOneUser(id) {
      return this.users.find(function (user) {
        return user.id === id;
      });
    }
  }, {
    key: 'userExistEmail',
    value: function userExistEmail(email) {
      return this.users.find(function (user) {
        return user.userEmail === email;
      });
    }
  }, {
    key: 'userSigin',
    value: function userSigin(email) {
      return this.users.find(function (user) {
        return user.userEmail === email;
      });
    }
    //  returns all users


  }, {
    key: 'findAllUsers',
    value: function findAllUsers() {
      return this.users;
    }
    //  Update user

  }, {
    key: 'updateUser',
    value: function updateUser(id, data) {
      var user = this.findOneUser(id);
      var index = this.users.indexOf(user);
      this.users[index].id = user.id;
      this.users[index].userName = data.userName || user.userName;
      this.users[index].userEmail = data.userEmail || user.userEmail;
      this.users[index].userAddress = data.userAddress || user.userAddress;
      this.users[index].modifiedDate = _moment2.default.now();
      return this.users[index];
    }

    // Delete a particular order

  }, {
    key: 'deleteUser',
    value: function deleteUser(id) {
      var user = this.findOneUser(id);
      var index = this.users.indexOf(user);
      this.users.splice(index, 1);
      return {};
    }
  }]);

  return User;
}();

exports.default = new User();