const parseUrl = require('url').parse;
const fs = require('fs');
const mkdirp = require('mkdirp-promise');
const path = require('path');
const cowsay = require('cowsay');
const fsp = require('fs-promise');

function hi(req, res) {
  const name = req.query.name || 'world';
  let greeting = `hi ${name}`;
  if(req.query.format === 'cowsay') {
    greeting = '<pre' + cowsay.say({
      text: greeting,
      e : 'oO',
      T : 'U '
    }) + '</pre>';
  }
  res.end(greeting);
}

function goodbye(req, res) {
  res.end('<h1>bye<p>');
}

function getIndex(req, res) {
  const filePath = path.join(__dirname, 'index.html');
  fs.readFile(filePath, (err, data) => {
    res.end(data);
  });
}

const routes = {
  '/': getIndex,
  '/index.html': getIndex,
  '/hi': hi,
  '/goodbye':goodbye,
  '/logs': logs
};


function app(req, res) {
  console.log(req.method, req.url);
  const url = parseUrl(req.url, true);
  req.query = url.query;

  res.setHeader('Content-Type', 'text/html');
  const route = routes[url.pathname] || notFound;
  route(req, res);
}


// function index(req, res) {
//   const filePath = path.join(__)
//   res.end(data);
// } 

function bodyParser(req) {
  return new Promise(resolve => {

    let body = '';
    req.on('data', data => {
      body += data;
    });

    req.on('end', () => {
      resolve(body);
    });
  });
}

function logs(req, res) {
  if (req.method === 'POST') {
    bodyParser(req).then(body => {

      mkdirp('./logs')
        .then( () => {
          const timestamp = new Date().toISOString();
          const filePath = `./logs/${timestamp}.txt`;
          
          fsp.writeFile(filePath, body).then(() => {
            const responseData = { timestamp };
            res.end(JSON.stringify(responseData));
          });
        });
    });
  }
}
 
function notFound(req, res){
  res.statusCode = 404;
  res.statusCode = `CANNOT GET ${req.url}`;
  res.end();
}

module.exports = app;

