const fs = require('fs');
const path = require('path');
const parseUrl = require('url').parse;
const mkdirp = require('mkdirp'); //separate library

function hello(req, res) {
    const name = req.nameQueryPath || 'Stranger';
    const salutation = req.query.salutation || 'Hello';
    let greeting = `<h1>${salutation}, ${name}!</h1>`;
    res.end(greeting);
}

function getFact(req, res) {
    const fact = `<h1>Dope fact about HTTP!</h1>`;
    res.end(fact);
}

function getIndex(req, res) {
    const filePath = path.join(__dirname, 'index.html'); //This the same as the path.dirname() of the __filename
    fs.readFile(filePath, (err, data) => {
        // TODO: deal with err...
        res.end(data);
    });
}

function logs(req, res) {

    if (req.method === 'POST') {
        let body = '';
        req.on('data', data => { //whenever data is sent this event will fire and add data to body
            body += data;
        });

        req.on('end', () => { //once there is no more data, end fires
            mkdirp('./logs', err => { //now I have all my data, I'm going to mkdir
                if (err) {
                    res.statusCode = 500;
                    res.statusMessage = 'Directory creation failed';
                    res.end();
                }
                const timestamp = new Date().toISOString();
                const responseData = { timestamp };


                fs.writeFile(`./logs/${timestamp}.txt`, body, err => {

                    res.statusCode = 201;
                    res.end(JSON.stringify(responseData));
                });

            });

        });


    }
}

const routes = {
    '/': getIndex,
    '/index.html': getIndex,
    '/greeting': hello,
    '/fact': getFact,
    '/logs': logs
};

function notFound(req, res) {
    res.statusCode = 404;
    res.statusMessage = `Cannot ${req.method}${req.url}`; //TODO: find proper syntax
    res.end();
}

function app(req, res) {
    console.log(req.method, req.url);
    const url = parseUrl(req.url, true);
    console.log('parsedURL', url); //makes the url string an object
    req.query = url.query;

    res.setHeader('Content-Type', 'text/html');

    const urlPathname = url.pathname.slice(1).split('/');
    const routeHit = routes[`/${urlPathname[0]}`] || notFound;
    req.nameQueryPath = urlPathname[1];

    routeHit(req, res);
}


module.exports = app;