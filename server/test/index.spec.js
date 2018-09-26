import request from 'supertest';
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { app, server } from '../server';

chai.use(chaiHttp);

let id = '';
let footitemId = '';
let orderID = '';

const newOrders = {
  userId: '2',
  orderId: '7',
  orderName: 'beans',
  quantity: '200',
  price: 'N200',
  imgUrl: 'jjjssj.jpg',
};

const newUser = {
  name: 'Ekpang Michael',
  email: 'Ekpang@gmail.com',
  address: 'Lagos',
  password: 'test123',
};

const newFastFood = {
  foodName: 'Jollof Rice',
  imgUrl: 'jollofrice23.jpg',
  category: 'meal',
  quantity: '20',
  price: 'N 1000',
};

describe('## API Test', () => {
  after((done) => {
    server.close();
    done();
  });

  describe('### Testing Orders Routes', () => {
    it('should create an order and get back a response', (done) => {

      request(app)
        .post('/api/v1/orders')
        .send(newOrders)
        .end((err, res) => {
          const data = JSON.parse(res.text);
          const name = data[1].orders.orderName;
          orderID = data[1].orders.id;
          console.log(orderID);
          expect(err).to.be.a('null');
          expect(name).to.equal(newOrders.orderName);
          expect(data[0].message).to.equal('Item added successfully');
          done();
        });
    });

    it('should return only one particular order', (done) => {
      request(app)
        .get(`/api/v1/orders/${orderID}`)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);
          const data = JSON.parse(res.text);
          expect(data[0].message).to.equal('Order found successfully');
          done();
        });
    });

    it('should update one particular order', (done) => {
      request(app)
        .put(`/api/v1/orders/${orderID}`)
        .send({
          orderStatus: 'Accepted',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          const data = JSON.parse(res.text);
          expect(data[0].message).to.equal('Order updated successfully');
          done();
        });
    });

    it('should return bad request error - All fields are required', (done) => {
      request(app)
        .post('/api/v1/orders')
        .send({
          userId: newOrders.userId,
          orderId: newOrders.orderId,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          const data = JSON.parse(res.text);
          expect(data.message).to.equal('All fields are required');
          done();
        });
    });

    it('Order should return an object of all orders', (done) => {
      request(app)
        .get('/api/v1/orders')
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);
          const data = JSON.parse(res.text);
          const dataObject = data[1].orders[0];
          expect(Object.keys(dataObject)).to.have.lengthOf(10);
          expect(data[0].message).to.equal('successful');
          done();
        });
    });
    it('should delete one particular order', (done) => {
      request(app)
        .delete(`/api/v1/orders/${orderID}`)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });
    it('Order should return an empty object', (done) => {
      request(app)
        .get('/api/v1/orders')
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);
          const data = JSON.parse(res.text);
          expect(data[0].message).to.equal('Order  is empty');
          done();
        });
    });

    it('Order should return 404 error', (done) => {
      request(app)
        .get('/api/v1/orders/:id')
        .send()
        .end((err, res) => {
          expect(res).to.have.status(404);
          const data = JSON.parse(res.text);
          expect(data.message).to.equal('Order not found');
          done();
        });
    });


    it('Order should return 404 error - Order not found ', (done) => {
      request(app)
        .put('/api/v1/orders/:id')
        .send()
        .end((err, res) => {
          expect(res).to.have.status(404);
          const data = JSON.parse(res.text);
          expect(data.message).to.equal('Order not found');
          done();
        });
    });

    it('Order should return 404 error - Order not found ', (done) => {
      request(app)
        .delete('/api/v1/orders/:id')
        .send()
        .end((err, res) => {
          expect(res).to.have.status(404);
          const data = JSON.parse(res.text);
          expect(data.message).to.equal('Order not found');
          done();
        });
    });
  });

  describe('### Testing Users Routes', () => {
    it('should create a new user and get back a response', (done) => {

      request(app)
        .post('/api/v1/users')
        .send(newUser)
        .end((err, res) => {
          const data = JSON.parse(res.text);
          const name = data[1].users.name;
          id = data[1].users.id;
          expect(err).to.be.a('null');
          expect(name).to.equal(newUser.name);
          expect(data[0].message).to.equal('Registration successful');
          done();
        });
    });

    it('Signin should return user sigin successful', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send({
          email: newUser.email,
          password: newUser.password,
        })
        .end((err, res) => {
          const data = JSON.parse(res.text);
          const name = data[1].users.name;
          expect(err).to.be.a('null');
          expect(name).to.equal(newUser.name);
          expect(data[0].message).to.equal('User login successfully');
          done();
        });
    });
    it('should update one particular user', (done) => {
      request(app)
        .put(`/api/v1/users/${id}`)
        .send({
          address: 'Calabar',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          const data = JSON.parse(res.text);
          expect(data[0].message).to.equal('user updated successfully');
          done();
        });
    });
    it('Get one particular user - should return User found successfully', (done) => {
      request(app)
        .get(`/api/v1/users/${id}`)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);
          const data = JSON.parse(res.text);
          expect(data[0].message).to.equal('User found successfully');
          done();
        });
    });

 it('create new user with the same email should return Email already Taken', (done) => {
      request(app)
        .post('/api/v1/users/')
        .send(newUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          const data = JSON.parse(res.text);
          expect(data.message).to.equal('Email already Taken!');
          done();
        });
    });
    it('expect password to be encrypted', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send({
          email: newUser.email,
          password: newUser.password,
        })
        .end((err, res) => {
          const data = JSON.parse(res.text);
          const pass = data[1].users.password;
          expect(err).to.be.a('null');
          expect(pass).not.to.equal(newUser.password);
          expect(data[0].message).to.equal('User login successfully');
          done();
        });
    });

    it('should return pass incorrect', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send({
          email: newUser.email,
          password: '123',
        })
        .end((err, res) => {
          const data = JSON.parse(res.text);
          expect(data.message).to.equal('Incorrect password');
          done();
        });
    });

    it('should return  bad request error - All fields are required', (done) => {
      request(app)
        .post('/api/v1/users')
        .send({
          email: newUser.email,
          password: newUser.password,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          const data = JSON.parse(res.text);
          expect(data.message).to.equal('All fields are required');
          done();
        });
    });

    it('should return an object of user(s)', (done) => {
      request(app)
        .get('/api/v1/users')
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);
          const data = JSON.parse(res.text);
          const dataObject = data[1].user[0];
          expect(Object.keys(dataObject)).to.have.lengthOf(7);
          expect(data[0].message).to.equal('successful');
          done();
        });
    });

    it('should return 404 error - User not found', (done) => {
      request(app)
        .get('/api/v1/users/:id')
        .send()
        .end((err, res) => {
          expect(res).to.have.status(404);
          const data = JSON.parse(res.text);
          expect(data.message).to.equal('User not found');
          done();
        });
    });


    it('Update should return 404 error - user not found ', (done) => {
      request(app)
        .put('/api/v1/users/:id')
        .send()
        .end((err, res) => {
          expect(res).to.have.status(404);
          const data = JSON.parse(res.text);
          expect(data.message).to.equal('user not found');
          done();
        });
    });

    it('Delete should return 404 error - user not found ', (done) => {
      request(app)
        .delete('/api/v1/users/:id')
        .send()
        .end((err, res) => {
          expect(res).to.have.status(404);
          const data = JSON.parse(res.text);
          expect(data.message).to.equal('user not found');
          done();
        });
    });
    it('should delete one particular user', (done) => {
      request(app)
        .delete(`/api/v1/users/${id}`)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });
    it('should return pass incorrect', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send({
          email: newUser.email,
          password: newUser.password,
        })
        .end((err, res) => {
          const data = JSON.parse(res.text);
          expect(data.message).to.equal('user not found');
          done();
        });
    });
    it('should return no registere users found', (done) => {
      request(app)
        .get('/api/v1/users')
        .send()
        .end((err, res) => {
          const data = JSON.parse(res.text);
          expect(data[0].message).to.equal('No registered Users');
          done();
        });
    });
  });

   describe('### Testing Admin Routes', () => {
    it('should create a new fast food item and return a response', (done) => {

      request(app)
        .post('/api/v1/admin')
        .send(newFastFood)
        .end((err, res) => {
          const data = JSON.parse(res.text);
          const name = data[1].foodItems.foodName;
          footitemId = data[1].foodItems.id;
          expect(err).to.be.a('null');
          expect(name).to.equal(newFastFood.foodName);
          expect(data[0].message).to.equal('Item added successfully');
          done();
        });
    });

    it('should return  bad request error - All fields are required', (done) => {
      request(app)
        .post('/api/v1/admin')
        .send({
          foodName: newFastFood.foodName,
          category: newFastFood.category,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          const data = JSON.parse(res.text);
          expect(data.message).to.equal('All fields are required');
          done();
        });
    });

    it('should return an object of fooditem(s)', (done) => {
      request(app)
        .get('/api/v1/admin')
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);
          const data = JSON.parse(res.text);
          const dataObject = data[1].foodItems[0];
          expect(Object.keys(dataObject)).to.have.lengthOf(8);
          expect(data[0].message).to.equal('successful');
          done();
        });
    });

    it('should return 404 error - Fooditem not found', (done) => {
      request(app)
        .get('/api/v1/admin/:id')
        .send()
        .end((err, res) => {
          expect(res).to.have.status(404);
          const data = JSON.parse(res.text);
          expect(data.message).to.equal('item not found');
          done();
        });
    });

    it('should return only one particular food item', (done) => {
      request(app)
        .get(`/api/v1/admin/${footitemId}`)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);
          const data = JSON.parse(res.text);
          expect(data[0].message).to.equal('item found successfully');
          done();
        });
    });

    it('should update one particular food item', (done) => {
      request(app)
        .put(`/api/v1/admin/${footitemId}`)
        .send({
          foodName: 'Fried Rice',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          const data = JSON.parse(res.text);
          expect(data[0].message).to.equal('item updated successfully');
          done();
        });
    });

    it('should delete one particular food item', (done) => {
      request(app)
        .delete(`/api/v1/admin/${footitemId}`)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });

    it('Update should return 404 error - Food item not found ', (done) => {
      request(app)
        .put('/api/v1/admin/:id')
        .send()
        .end((err, res) => {
          expect(res).to.have.status(404);
          const data = JSON.parse(res.text);
          expect(data.message).to.equal('item not found');
          done();
        });
    });

    it('Delete should return 404 error - Food item not found ', (done) => {
      request(app)
        .delete('/api/v1/admin/:id')
        .send()
        .end((err, res) => {
          expect(res).to.have.status(404);
          const data = JSON.parse(res.text);
          expect(data.message).to.equal('item not found');
          done();
        });
    });

      it('should return an object of fooditem(s)', (done) => {
      request(app)
        .get('/api/v1/admin')
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);
          const data = JSON.parse(res.text);
          const dataObject = data[1].foodItems[0];
          expect(data[0].message).to.equal('No Fast Food Item Found');
          done();
        });
    });

     it('Home route should return the apiDocs object ', (done) => {
      request(app)
        .get('/')
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);
          const data = JSON.parse(res.text);
          done();
        });
    });
  });
});
