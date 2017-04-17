const fs = require('fs');
const path = require('path');

const routes = {
  '/': sendIndex,
  '/index.html': sendIndex,
  '/fact': sendFact
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

function notFound(req, res) {
  res.statusCode = 404;
  res.statusMessage = `${req.url} not found`;
  res.end();
}

function app(req, res) {
  console.log(req.url);

  const route = routes[req.url] || notFound;

  res.setHeader('Content-Type', 'text/html');
  route(req, res);
}

module.exports = app;