const fs = require('fs');
const path = require('path');
const parseUrl = require('url').parse;

function greeting(req, res) {
  const name = req.query.name || 'stranger';
  let greeting = `hello ${name}`;
  res.end(greeting);
}

function index(req, res) {
  const filePath = path.join('index.html');
  fs.readFile(filePath, (err, data) => {
    if (err) return res.end(err);
    res.end(data);
  });
}

function notFound(req, res) {
  res.statusCode = 404;
  res.statusMessage = `${req.url} not found`;
  res.end();
}

const routes = {
  '/': index,
  '/index.html': index,
  '/hello': greeting,
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