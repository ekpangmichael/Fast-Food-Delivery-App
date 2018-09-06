import bcrypt from 'bcrypt';
import UsersModel from '../model/users';
// Oder object
const User = {

  // Register User
  createUser(req, res) {
    if (!req.body.userName || !req.body.userEmail || !req.body.userPassword
      || !req.body.userAddress) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const checkUser = UsersModel.userExistEmail(req.body.userEmail);
    if (checkUser) {
      return res.status(400).send({ message: 'Email already Taken!' });
    }
    const user = UsersModel.userRegistration(req.body);
    return res.status(201).send([{ message: 'Registration successful' }, { users: user }]);
  },
  // get all available orders

  getAllUsers(req, res) {
    let userMesage = '';
    const users = UsersModel.findAllUsers();
    if (users.length === 0) {
      userMesage = 'No registered Users';
    } else {
      userMesage = 'successful';
    }
    return res.status(200).send([{ message: userMesage }, { user: users }]);
  },
  // get a partcular user

  getOneUser(req, res) {
    const user = UsersModel.findOneUser(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }
    return res.status(200).send([{ message: 'user found successfully' }, user]);
  },

  userSigin(req, res) {
    const pass = req.body.userPassword;
    const user = UsersModel.userSigin(req.body.userEmail);
    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }
    return bcrypt.compare(pass, user.userPassword).then((result) => {
      if (result === true) {
        return res.status(200).send([{ message: 'User login successfully' }, { users: user }]);
      }
      return res.status(200).send({ message: 'Incorrect password' });
    });
  },

  //  update a particular user
  updateUser(req, res) {
    const user = UsersModel.findOneUser(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }
    const updatedUser = UsersModel.updateUser(req.params.id, req.body);
    return res.status(200).send([{ message: 'user updated successfully' }, updatedUser]);
  },

  // deleta a particular user
  deleteUser(req, res) {
    const user = UsersModel.findOneUser(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }
    const ref = UsersModel.deleteUser(req.params.id);
    return res.status(204).send([{ message: 'user deleted successfully' }, ref]);
  },
};

export default User;
