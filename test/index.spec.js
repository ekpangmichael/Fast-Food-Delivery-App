import request from 'supertest';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import { app, server } from '../server';

describe('## API Tests', () => {

  after( (done) => {
        server.close();
        done();
    });
  describe('### POST /Orders', () => {
    
    it('should create a user and get back a response', (done) => {
      const orders = {
        userId: '2',
        orderId: '7',
        orderName: 'beans',
        quantity: '200',
        price: 'N200',
        imgUrl: 'jjjssj.jpg',
      };

      request(app)
        .post('/api/v1/orders')
        .send(orders)
        .end((err, res) => {
          const data = JSON.parse(res.text);
          const name = data[1].orders.orderName;
          expect(name).to.equal(orders.orderName);
          done();
        });
    });
    // it('should return the created order successfully', (done) => {
    //   request(app)
    //     .post('/api/v1/orders')
    //     .send({
    //       userId: '2',
    //       orderId: '7',
    //       orderName: 'beans',
    //       quantity: '200',
    //       price: 'N200',
    //       imgUrl: 'jjjssj.jpg',
    //     })
    //     .expect(httpStatus.Ok)
    //     .then((res) => {
    //       expect(res.message).to.equal('Item added successfully');
    //       //expect(res.body.orderName).to.equal('beans');
    //       //expect(res.body.orderId).to.exist();
    //       done();
    //     });
    // });
  });
});
