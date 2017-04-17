const parsedUrl = require('url').parse;
const fs = require('fs');
const path = require('path');

const routes = {
  '/': index,
  '/index.html': index,
  '/fact': fact,
  '/greeting': greeting
};

function app(req, res) {
  console.log(req.method, req.url);

  const url = parsedUrl(req.url, true);
  console.log(url);
  req.query = url.query; 

  const route = routes[url.pathname] || notFound;
  route(req, res);
}

function index(req, res) {
  const filePath = path.join(__dirname, 'index.html');
  fs.readFile(filePath, (err, page) => {
    if(err) notFound;
    res.end(page);
  });
}

function fact(req, res) {
  
}

function greeting(req, res) { 
}

function notFound(req, res) {
  res.end('404 woops, nothing there');
}

module.exports = app;