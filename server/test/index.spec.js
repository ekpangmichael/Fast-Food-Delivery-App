import request from 'supertest';
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { app, server } from '../server';
import testUsers from '../seeders/testUsers';
import testOrders from '../seeders/testOrders';
import testAdmin from '../seeders/testAdmin';


chai.use(chaiHttp);

let usertoken = '';
let admintoken = '';
let menuId = '';
let orderId = '';
let orderStatus = 'processing';
const id = 1;
describe('## API Test', () => {
  after((done) => {
    server.close();
    done();
  });

  describe('### Testing Users Routes', () => {
    it('Should sign up a user', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send(testUsers.signUp.fullDetails)
        .end((err, res) => {
          const data = JSON.parse(res.text);
          expect(err).to.be.a('null');
          done();
        });
    });
    it('Should return email already exit', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send(testUsers.signUp.fullDetails)
        .end((err, res) => {
          const data = JSON.parse(res.text);
          expect(err).to.be.a('null');
          expect(data[1].message).to.equal('EMAIL already exist');
          done();
        });
    });

    it('should return bad request error - All fields are required', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send(testUsers.signUp.nullEmail)
        .end((err, res) => {
          const data = JSON.parse(res.text);
          expect(err).to.be.a('null');
          expect(data[1].message).to.equal('All fields are required');
          done();
        });
    });
    it('Should sign in user successfully ', (done) => {
      request(app)
        .post('/api/v1/auth/login')
        .send(testUsers.signIn.fullSigninDetails)
        .end((err, res) => {
          expect(res).to.have.status(200);
          const data = JSON.parse(res.text);
          //const id = data[2].rows[0].id;
          usertoken = data[1].token;
          expect(data[0].status).to.equal('successful');
          done();
        });
    });

    it('Should return Some fields are missing', (done) => {
      request(app)
        .post('/api/v1/auth/login')
        .send(testUsers.signIn.nullPassword)
        .end((err, res) => {
          expect(res).to.have.status(400);
          const data = JSON.parse(res.text);
          expect(data[0].status).to.equal('fail');
          done();
        });
    });

    it('Should return invalid email', (done) => {
      request(app)
        .post('/api/v1/auth/login')
        .send(testUsers.signIn.invalidEmail)
        .end((err, res) => {
          expect(res).to.have.status(400);
          const data = JSON.parse(res.text);
          expect(data[0].status).to.equal('fail');
          done();
        });
    });

    it('Should return user not found', (done) => {
      request(app)
        .post('/api/v1/auth/login')
        .send(testUsers.signIn.wrongSigninDetails)
        .end((err, res) => {
          expect(res).to.have.status(400);
          const data = JSON.parse(res.text);
          expect(data[0].status).to.equal('fail');
          done();
        });
    });

    it('Should return invalid password', (done) => {
      request(app)
        .post('/api/v1/auth/login')
        .send(testUsers.signIn.invalidPassword)
        .end((err, res) => {
          expect(res).to.have.status(400);
          const data = JSON.parse(res.text);
          expect(data[0].status).to.equal('fail');
          done();
        });
    });

  });


  describe('### Testing orders Routes', () => {
    it('Should create an order', (done) => {
        request(app)
        .post('/api/v1/orders')
        .set('x-access-token', usertoken)
        .send(testOrders.orders.fullDetails)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(err).to.be.a('null');
          done();
        });
    });
   it('Should return order history', (done) => {
      request(app)
        .get(`/api/V1/orders/users/${id}`)
        .set('x-access-token', usertoken)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);
          const data = JSON.parse(res.text);
          expect(data[0].status).to.equal('successful');
          done();
        });
    });

    
    it('Should get 403 2 error', (done) => {
      request(app)
        .get(`/api/V1/orders`)
        .set('x-access-token', usertoken)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(403);
          done();
        });
    });

    it('Should get 403 3 error', (done) => {
      request(app)
        .get(`/api/V1/orders/:id`)
        .set('x-access-token', usertoken)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(403);
          done();
        });
    });

    it('Should get 403 4 error', (done) => {
      request(app)
        .put(`/api/V1/orders/:id`)
        .set('x-access-token', usertoken)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(403);
          done();
        });
    });

    it('Login user Should be an admin ', (done) => {
      request(app)
        .post('/api/v1/auth/login')
        .send(testUsers.signIn.adminLogin)
        .end((err, res) => {
          expect(res).to.have.status(200);
          const data = JSON.parse(res.text);
           admintoken = data[1].token;
          expect(data[0].status).to.equal('successful');
          expect(data[2].rows[0].is_admin).to.equal(true);
          done();
        });
    });
  });

 describe('### Testing menu Routes', () => {
    it('Should create a menu', (done) => {
        request(app)
        .post('/api/v1/menu/')
        .set('x-access-token', admintoken)
        .send(testAdmin.menu.createMenu)
        .end((err, res) => {
          const data = JSON.parse(res.text);
          expect(res).to.have.status(201);
          expect(err).to.be.a('null');
          done();
        });
    });

     it('Should get all menu', (done) => {
        request(app)
        .get('/api/v1/menu/')
        .set('x-access-token', admintoken)
        .send(testAdmin.menu.createMenu)
        .end((err, res) => {
          const data = JSON.parse(res.text);
          menuId = data.rows[0].id;
          expect(res).to.have.status(200);
          expect(err).to.be.a('null');
          done();
        });
    });


     it('Should get a particular menu', (done) => {
        request(app)
        .get(`/api/v1/menu/${menuId}`)
        .set('x-access-token', admintoken)
        .send(testAdmin.menu.createMenu)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(err).to.be.a('null');
          done();
        });
    });

      it('Should delete a particular menu item', (done) => {
        request(app)
        .delete(`/api/v1/menu/${menuId}`)
        .set('x-access-token', admintoken)
        .send(testAdmin.menu.createMenu)
        .end((err, res) => {
          expect(res).to.have.status(204);
          expect(err).to.be.a('null');
          done();
        });
    });
    it('Get all recent orders', (done) => {
        request(app)
        .get('/api/v1/orders/new')
        .set('x-access-token', admintoken)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(err).to.be.a('null');
          done();
        });
    });

it('Get all available orders', (done) => {
        request(app)
        .get('/api/v1/orders/')
        .set('x-access-token', admintoken)
        .send()
        .end((err, res) => {
          const data = JSON.parse(res.text);
          orderId= data.rows[0].id;
          expect(res).to.have.status(200);
          expect(err).to.be.a('null');
          done();
        });
    });
it('Should Get one particular order', (done) => {
        request(app)
        .get(`/api/v1/orders/${orderId}`)
        .set('x-access-token', admintoken)
        .send()
        .end((err, res) => {
          const data = JSON.parse(res.text);
          expect(res).to.have.status(200);
          expect(err).to.be.a('null');
          done();
        });
    });
it('Should change order status', (done) => {
        request(app)
        .put(`/api/v1/orders/${orderId}`)
        .set('x-access-token', admintoken)
        .send(testOrders.orders.orderStatus)
        .end((err, res) => {
          const data = JSON.parse(res.text);
          expect(res).to.have.status(200);
          expect(err).to.be.a('null');
          done();
        });
    });
  });
});
