const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const app = require('../lib/app');

chai.use(chaiHttp);

describe('app', () => {

  const request = chai.request(app);

  it('says hello stranger', done => {
    request.get('/hello')
      .end((err, res) => {
        assert.equal(res.text, 'Hello stranger');
        done();
      });
  });

  it('greets a person with a name', done => {
    const name = 'Dave';
    request.get(`/hello?name=${name}`)
      .end((err, res) => {
        assert.equal(res.text, 'Hello Dave');
        done();
      });
  });

  it('greets a person with a custom salutation', done => {
    const salutation = 'Hey hey hey';
    const name = 'Dave';
    request.get(`/hello?name=${name}&salutation=${salutation}`)
      .end((err, res) => {
        assert.equal(res.text, 'Hey hey hey Dave');
        done();
      });
  });

  it('responds with fun fact', done => {
    request.get('/fact')
      .end((err, res) => {
        assert.equal(res.text, 'Did you know that a pomeranian watched Michealangelo paint the Sistine Chapel? It\'s true.');
        done();
      });
  });

  it('serves contents of /index', done => {
    request.get('/')
      .end((err, res) => {
        assert.match(res.text, /This website is full of fluffy dogs./);
        done();
      });
  });

  it('returns a 404', done => {
    request.get('/doesnotexist')
    .end((err, res) => {
      assert.equal(res.res.statusMessage, 'CANNOT GET /doesnotexist'); 
      done();
    });
  });
});