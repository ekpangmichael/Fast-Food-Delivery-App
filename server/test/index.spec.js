import request from 'supertest';
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { app, server } from '../server';
import testUsers from '../seeders/testUsers';

chai.use(chaiHttp);
describe('## API Test', () => {
  after((done) => {
    server.close();
    done();
  });

  describe('### Testing Users Routes', () => {
    it('sign up a user', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send(testUsers.signUp.fullDetails)
        .end((err, res) => {
          const data = JSON.parse(res.text);
          //onst name = data[1].orders.orderName;
          //orderID = data[1].orders.id;
          console.log(data);
          expect(err).to.be.a('null');
          //expect(name).to.equal(newOrders.orderName);
          //expect(data[0].message).to.equal('Item added successfully');
          done();
        });
    });
  });
});
