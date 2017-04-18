const chai = require('chai-http');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const app = require('../lib/app');

chai.use(chaiHttp);

describe('app', () => {

  const request = chai.request(app);

  it('says hello stranger', done => {
    request.get('/greeting')
        .end((err, res) => {
          assert.equal(res.text, 'hello stranger');
          done();
        });
  });
});
// I can't get the tests to run successfuly, i keep getting errors telling me that chai.use or chai.request are not function, but I have everything setup correctly as far as I can tell.