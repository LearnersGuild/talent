import chai, { expect } from 'chai';
import app from '../src/server/server.js';
import chaiHTTP from 'chai-http';

chai.use(chaiHTTP);

const request = chai.request;

context('Status', function() {
  describe('/', function() {
    it('Should render the home page', function() {
      return request(app)
      .get('/')
      .then(response => {
        console.log("response:::", response);
        expect(response).to.have.status(200);
      });
    });
  });
});
