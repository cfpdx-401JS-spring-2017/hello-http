const fs = require('fs');
const path = require('path');
const parseUrl = require('url').parse;
const mkdirp = require('mkdirp');

const routes = {
  '/': sendIndex,
  '/index.html': sendIndex,
  '/fact': sendFact,
  '/greeting': sendGreeting,
  '/logs': logs
};

function sendIndex(req, res) {
  const filePath = path.join(__dirname, 'index.html');
  
  fs.readFile(filePath, (err, data) => {
    res.end(data);
  });
}

function sendFact(req, res) {
  res.end('HTTP is a set of standards that allow users of the World Wide Web to exchange information found on web pages');
}

function sendGreeting(req, res) {
  let salutation = req.query.salutation || 'hello';
  let name = req.name || 'stranger';

  res.end(`${salutation} ${name}`);
}

function notFound(req, res) {
  res.statusCode = 404;
  res.statusMessage = `CANNOT ${req.method} ${req.url}`;
  res.end();
}

function logs(req, res) {

  if (req.method === 'POST') {
    let body = '';

    req.on('data', data => {
      body += data;
    });

    req.on('end', () => {
      mkdirp('./logs', err => {
        if (err) {
          res.statusCode = 500;
          res.statusMessage = 'Error: directory creation failed';
          res.end();
        }

        const timestamp = new Date().toISOString();
        const responseData = { timestamp };

        fs.writeFile(`./logs/${timestamp}.txt`, body, err => {
          if (err) {
            res.statusCode = 500;
            res.statusMessage = 'Error: file creation failed';
            res.end();
          }

          res.statusCode = 201;
          res.end(JSON.stringify(responseData));
        });
      });

    });

  } else {
    req.statusMessage = 'Not found';
  }
}

function app(req, res) {
  const url = parseUrl(req.url, true);
  const splitUrl = url.pathname.slice(1).split('/');
  const name = splitUrl[1];
  const route = routes[`/${splitUrl[0]}`] || notFound;

  res.setHeader('Content-Type', 'text/html');
  req.query = url.query;
  req.name = name;

  route(req, res);
}

module.exports = app;