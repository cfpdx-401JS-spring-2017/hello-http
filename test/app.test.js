const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const app = require('../lib/app');

chai.use(chaiHttp);

describe('app', () => {

  const request = chai.request(app);

  it('sends HTML file when a request hits /', done => {
    request.get('/')
      .end((err, res) => {
        assert.match(res.text, /Home/);
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

  it('sends a 404 response if page doesn\'t exist', done => {
    request.get('/doesntexist')
      .end((err, res) => {
        assert.equal(res.statusCode, 404);
        done();
      });
  });

  it('responds with a greeting based on the provided name', done => {
    request.get('/greeting/yuval')
      .end((err, res) => {
        assert.equal(res.text, 'hello yuval');
        done();
      });
  });

  it('responds with a salutation if salutation query string included', done => {
    request.get('/greeting/yuval/?salutation=hola')
      .end((err, res) => {
        assert.equal(res.text, 'hola yuval');
        done();
      });
  });

});