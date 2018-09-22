import moment from 'moment';
import uuid from 'uuid';
import bcrypt from 'bcrypt';

const saltRounds = 10;

class User {
  //  class constructor
  constructor() {
    this.users = [];
  }

  //  returns orders object

  userRegistration(data) {
    const newUser = {
      id: uuid.v4(),
      userName: data.userName || '',
      userEmail: data.userEmail || '',
      userAddress: data.userAddress || '',
      userPassword: bcrypt.hashSync(data.userPassword, saltRounds) || '',
      regDate: moment.now(),
      modifiedDate: moment.now(),
    };
    this.users.push(newUser);
    return newUser;
  }

  //  Returns a particular user

  findOneUser(id) {
    return this.users.find(user => user.id === id);
  }
  // Check if the email already exit

  userExistEmail(email) {
    return this.users.find(user => user.userEmail === email);
  }
  // Check if a user exit with that same email

  userSigin(email) {
    return this.users.find(user => user.userEmail === email);
  }
  //  returns all users


  findAllUsers() {
    return this.users;
  }
  //  Update user

  updateUser(id, data) {
    const user = this.findOneUser(id);
    const index = this.users.indexOf(user);
    this.users[index].id = user.id;
    this.users[index].userName = data.userName || user.userName;
    this.users[index].userEmail = data.userEmail || user.userEmail;
    this.users[index].userAddress = data.userAddress || user.userAddress;
    this.users[index].modifiedDate = moment.now();
    return this.users[index];
  }

  // Delete a particular order

  deleteUser(id) {
    const user = this.findOneUser(id);
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
    return {};
  }
}

export default new User();
