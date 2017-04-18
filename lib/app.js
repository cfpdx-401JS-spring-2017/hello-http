const fs = require('fs');
const mkdirp = require('mkdirp');
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
          res.statusMessage = 'Directory creation failed';
          res.end();
        }
        const timestamp = new Date().toISOString();
        const responseData = { timestamp };
        
        fs.writeFile(`./logs/${timestamp}.txt`, body, err => {
          if (err) { 
            res.statusCode = 500;
            res.statusMessage = 'File creation failed';
            res.end();
          }
          res.statusCode = 201;
          res.end(JSON.stringify(responseData));
        });
      });
    });
  }

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
  '/logs': logs,
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