const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const rimraf = require('rimraf');
const fs = require('fs');
const app = require('../lib/app');

chai.use(chaiHttp);

describe('app', () => {
    const request = chai.request(app);

    describe('/greeting', () => {


        it('says hello ivy when name passed as query param', done => {
            request.get('/greeting/Ivy')
                .end((err, res) => {
                    assert.equal(res.text, '<h1>Hello, Ivy!</h1>');
                    done();
                });
        });

        it('says hello stranger when no name is passed in', done => {
            request.get('/greeting')
                .end((err, res) => {
                    assert.equal(res.text, '<h1>Hello, Stranger!</h1>');
                    done();
                });
        });

        it('gets index on root /', done => {
            request.get('/')
                .end((err, res) => {
                    assert.match(res.text, /Lab Server Is Doing It!/);
                    done();
                });
        });

        it('provides an http fact', done => {
            request.get('/fact')
                .end((err, res) => {
                    assert.equal(res.text, '<h1>Dope fact about HTTP!</h1>');
                    done();
                });
        });
    });

    describe('POST/logs', () => {

        before(done => {
            rimraf('./logs', err => { //this is the path to logs dir
                if (err) return done(err);
                done();
            });
        });

        it('it creates a logs directory if none exists and returns 201', done => {
            const postTestData = {
                text: 'this is the post body'
            };
            
            request.
                post('/logs') //when we hit logs route 
                .send(postTestData) //if fields are in your postbody, that's the info that you're updating
                .end((err, res) => {


                    if (err) return done(err);
                    assert.equal(res.statusCode, 201);

                    fs.readdir('./logs', (err, files) => {  //readdir returns an array of the files in the directory
                        if (err) return done(err);
                        assert.equal(files.length, 1);
                        done();

                    });

                });
        });

    });
});