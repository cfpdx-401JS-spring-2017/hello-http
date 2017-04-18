const fs = require('fs');
const path = require('path');
const parseUrl = require('url').parse;

const routes = {
  '/': sendIndex,
  '/index.html': sendIndex,
  '/fact': sendFact,
  '/greeting': sendGreeting
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