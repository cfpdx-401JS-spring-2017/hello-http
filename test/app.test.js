const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const app = require('../lib/app');

chai.use(chaiHttp);

describe('app', () => {

  const request = chai.request(app);

  it('says hello world', done => {
    request.get('/hello')
      .end((err, res) => {
        assert.equal(res.text, '<h4>hello world</h4>');
        done();
      });
  });

  it('says hello world', done => {
    request.get('/goodbye')
      .end((err, res) => {
        assert.equal(res.text, '<h5>goodbye world</h5>');
        done();
      });
  });

  it('says hello morgan when name passed as query param', done => {
    request.get('/hello?name=morgan')
      .end((err, res) => {
        assert.equal(res.text, '<h4>hello morgan</h4>');
        done();
      });
  });

  it('gets index on root /', done => {
    request.get('/')
      .end((err, res) => {
        assert.match(res.text, /Welcome to our server/);
        done();
      });
  });
});