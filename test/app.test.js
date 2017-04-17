const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const app = require('../lib/app');

chai.use(chaiHttp);

describe('app', () => {

  const request = chai.request(app);

  it('says "request received!"', done => {
    request.get('/')
      .end((err, res) => {
        assert.equal(res.text, 'request received!');
        done();
      });
  });
});