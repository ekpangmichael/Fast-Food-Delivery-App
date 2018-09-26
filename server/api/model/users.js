import bcrypt from 'bcrypt';

const saltRounds = 10;
const date = new Date();
const uid = Math.floor((Math.random() * 100000000) + 1);

class User {
  //  class constructor
  constructor() {
    this.users = [];
  }

  //  returns orders object

  userRegistration(data) {
    const newUser = {
      id: uid,
      name: data.name || '',
      email: data.email || '',
      address: data.address || '',
      password: bcrypt.hashSync(data.password, saltRounds) || '',
      regDate: date,
      modifiedDate: date,
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
    return this.users.find(user => user.email === email);
  }
  // Check if a user exit with that email

  userSigin(email) {
    return this.users.find(user => user.email === email);
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
    this.users[index].name = data.name || user.name;
    this.users[index].email = data.email || user.email;
    this.users[index].address = data.address || user.address;
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
