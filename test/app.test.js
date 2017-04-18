const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;

const rimraf = require('rimraf');
const fs = require('fs');
const app = require('../lib/app');

chai.use(chaiHttp);

describe('app', () => {

  const request = chai.request(app);

  describe('/greeting', () => {

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

  describe('/post', () => {

    before(done => {
      rimraf('./logs', err => {
        if (err) return done(err);
        done();
      });
    });

    it.only('POST /logs, creates directory', done => {
      const postData = {
        text: 'blah',
        greeting: 'hey hey hey' };
      
      request
        .post('/logs')
        .send(postData)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.statusCode, 201);
          
          fs.readdir('./logs', (err, files) => {
            if (err) return done(err);
            assert.equal(files.length, 1);
          
            fs.readFile(`./logs/${files[0]}`, (err, data) => {
              if (err) return done(err);
              assert.deepEqual(JSON.parse(data), postData);
              done();
            });
          });
        });
    });
  });

});