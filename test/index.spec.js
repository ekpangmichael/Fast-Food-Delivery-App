import request from 'supertest';
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { app, server } from '../server';

chai.use(chaiHttp);

const newOrders = {
  userId: '2',
  orderId: '7',
  orderName: 'beans',
  quantity: '200',
  price: 'N200',
  imgUrl: 'jjjssj.jpg',
};

const newUser = {
  userName: 'Ekpang Michael',
  userEmail: 'Ekpang@gmail.com',
  userAddress: 'Lagos',
  userPassword: 'test123',
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
          // const order = data[1].orders;
          const name = data[1].orders.orderName;
          expect(err).to.be.a('null');
          expect(name).to.equal(newOrders.orderName);
          expect(data[0].message).to.equal('Item added successfully');
          done();
        });
    });

    it('should return  bad request error', (done) => {
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
          // console.log(dataObject);
          expect(Object.keys(dataObject)).to.have.lengthOf(10);
          expect(data[0].message).to.equal('successful');
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
          const name = data[1].users.userName;
          expect(err).to.be.a('null');
          expect(name).to.equal(newUser.userName);
          expect(data[0].message).to.equal('Registration successful');
          done();
        });
    });

    it('Signin should return user sigin successful', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send({
          userEmail: newUser.userEmail,
          userPassword: newUser.userPassword,
        })
        .end((err, res) => {
          const data = JSON.parse(res.text);
          const name = data[1].users.userName;
          expect(err).to.be.a('null');
          expect(name).to.equal(newUser.userName);
          expect(data[0].message).to.equal('User login successfully');
          done();
        });
    });

    it('expect password to be encrypted', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send({
          userEmail: newUser.userEmail,
          userPassword: newUser.userPassword,
        })
        .end((err, res) => {
          const data = JSON.parse(res.text);
          const pass = data[1].users.userPassword;
          expect(err).to.be.a('null');
          expect(pass).not.to.equal(newUser.userPassword);
          expect(data[0].message).to.equal('User login successfully');
          done();
        });
    });
    it('should return  bad request error - All fields are required', (done) => {
      request(app)
        .post('/api/v1/users')
        .send({
          userEmail: newUser.userEmail,
          userPassword: newUser.userPassword,
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
          expect(data.message).to.equal('user not found');
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
  });

   describe('### Testing Admin Routes', () => {
    it('should create a new fast food item and return a response', (done) => {

      request(app)
        .post('/api/v1/admin')
        .send(newFastFood)
        .end((err, res) => {
          const data = JSON.parse(res.text);
          const name = data[1].foodItems.foodName;
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
  });
});
