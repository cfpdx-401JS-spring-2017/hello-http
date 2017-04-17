const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const app = require('../lib/app');

chai.use(chaiHttp);

describe('app', () => {

  const request = chai.request(app);

  it('says "hit home!" when a request hits /', done => {
    request.get('/')
      .end((err, res) => {
        assert.equal(res.text, 'hit home!');
        done();
      });
  });

  it('sends a fact if request hits /fact', done => {
    request.get('/fact')
      .end((err, res) => {
        assert.equal(res.text, 'HTTP is a set of standards that allow users of the World Wide Web to exchange information found on web pages');
        done();
      });
  });

});