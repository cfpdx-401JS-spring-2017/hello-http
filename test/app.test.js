const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const rimraf = require('rimraf');
const cowsay = require('cowsay');
const fs = require('fs');

const app = require('../lib/app');

chai.use(chaiHttp);

describe('app', () => {

  const request = chai.request(app);

  describe('/greeting', () => {

    it('says hello stranger as default', done => {
      request.get('/greeting')
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.text, '<pre>' + cowsay.say({
            text: 'hello stranger',
            e: "oO",
            T: "U "
          }) + '</pre>');
          done();
        });
    });

    it('says salutation <name> when correct query is input', done => {
      request.get('/greeting?salutation=nicky')
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.text, '<pre>' + cowsay.say({
            text: 'salutations nicky',
            e: "oO",
            T: "U "
          }) + '</pre>');
          done();
        });
    });
  }),

  describe('fact', () => {

    it('serves fact.html when that page is navigated to', done => {
      request.get('/fact')
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res)
        });
    });
  }),

  describe('notfound', () => {

    it('returns status code 404 when resource is not found', done => {
      request.get('/ashde')
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.statusCode, 404);
          done();
        });
    });
  }),

  describe('POST /logs', () => {

    before(done => {
      rimraf('./logs', err => {
        if (err) return done(err);
        done();
      })
    });

    it('creates a logs directory if none exists and returns 201', done => {
      const postData = { text: 'blah' }
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
              assert.deepEqual(JSON.parse(data), postData)
              done();
            });
          });
        });
    });
  });
});

