import request from 'supertest';
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { app, server } from '../server';

chai.use(chaiHttp);

const orders = {
  userId: '2',
  orderId: '7',
  orderName: 'beans',
  quantity: '200',
  price: 'N200',
  imgUrl: 'jjjssj.jpg',
};

const orders2 = {
  userId: '2',
  orderId: '7',
  orderName: 'beans',
};

describe('## API Tests', () => {
  after((done) => {
    server.close();
    done();
  });

  describe('### POST /Orders', () => {
    it('should create a user and get back a response', (done) => {

      request(app)
        .post('/api/v1/orders')
        .send(orders)
        .end((err, res) => {
          const data = JSON.parse(res.text);
          const order = data[1].orders;
          const name = data[1].orders.orderName;
          expect(err).to.be.a('null');
          expect(name).to.equal(orders.orderName);
          expect(data[0].message).to.equal('Item added successfully');
          done();
        });
    });

    it('should return  bad request error', (done) => {
      request(app)
        .post('/api/v1/orders')
        .send(orders2)
        .end((err, res) => {
          expect(res).to.have.status(400);
          const data = JSON.parse(res.text);
          expect(data.message).to.equal('All fields are required');
          done();
        });
    });

    it('Order should return an object', (done) => {
      request(app)
        .get('/api/v1/orders')
        .send(orders)
        .end((err, res) => {
          expect(res).to.have.status(200);
          const data = JSON.parse(res.text);
          const dataObject = data[1].orders[0];
          //console.log(dataObject);
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
});
