import request from 'supertest';
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { app, server } from '../server';

chai.use(chaiHttp);

describe('my suite', () => {
   it('should return hello',  () => {
    const message = 'hello'
       expect(message).to.equal('hello');
    });
});
