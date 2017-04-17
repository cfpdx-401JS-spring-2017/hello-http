const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const app = require('../lib/app');

describe('app', () => {

  const request = chai.request(app);

  it('says hello world', done => {
    request.get('/hello')
    .end((err, res) => {
      assert.equal(res.text, '');
      done();
    });
  });

  it('greets a person with a name', done => {
    request.get(`/hello?name=${name}`)
    .end((err, res) => {
      assert.equal(res.text, 'Hello Dave');
      done();
    });
  });

  it('responds with fun fact', done => {
    request.get('/fact')
    .end((err, res) => {
      assert.equal(res.text, fact);
      done();
    });
  });

  it('serves contents of /index', done => {
    request.get('/')
    .end((err, res) => {
      assert.match(res.text, /Hello Guest/);
      done();
    });
  });
});