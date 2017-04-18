const fs = require('fs');
const path = require('path');
const parseUrl = require('url').parse;

function greeting(req, res) {
  const name = req.query.name || 'stranger';
  const salutation = req.query.salutation || 'Hello';
  let greeting = `${salutation} ${name}`;
  res.end(greeting);
}

function fact(req, res) {
  const fact = 'Did you know that a pomeranian watched Michealangelo paint the Sistine Chapel? It\'s true.';
  res.end(fact);
}

function index(req, res) {
  const filePath = path.join(__dirname, 'index.html');
  fs.readFile(filePath, (err, data) => {
    res.end(data);
  });
}

function notFound(req, res) {
  res.statusCode = 404;
  res.statusMessage = `CANNOT GET ${req.url}`;
  res.end();
}

const routes = {
  '/': index,
  '/index.html': index,
  '/hello': greeting,
  '/fact': fact,
  '/404': notFound
};

function app(req, res) {
  const url = parseUrl(req.url, true);
  req.query = url.query;

  res.setHeader('Content-Type', 'text/html');
  const route = routes[url.pathname] || notFound;
  route(req, res);
}

module.exports = app;