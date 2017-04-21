const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const app = require('../lib/app');
const rimraf = require('rimraf');
const fs = require('fs');

chai.use(chaiHttp);

describe('app', () => {
  const request = chai.request(app);

  it ('says what it do', done => {
    request.get('/hi')
      .end((err, res) => {
        assert.equal(res.text, 'hi');
        done();
      });
  });

  describe('POST /logs', () => {
    before(done => {
      rimraf('./logs', err => {
        if (err) done (err);
        done();
      });
    });

    it.only('create a logs direcotry if none exists and returns 201', done => {
      request
      .post('/logs')
      .field('text', 'this is the post body')
      .end((err, res) => {
        if(err) return done(err);

        assert.equal(res.statusCode, 200);
        fs.readdir('./logs', (err,files) => {
          assert.equal(files.length, 1);
          done();
        });
      });
    });
  });
});






