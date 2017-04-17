const routes = {
  '/': sendIndex,
  '/index.html': sendIndex,
  '/fact': sendFact
};

function sendIndex(req, res) {
  res.end('hit home!');
}

function sendFact(req, res) {
  res.end('HTTP is a set of standards that allow users of the World Wide Web to exchange information found on web pages');
}

function app(req, res) {
  console.log(req.url);

  const route = routes[req.url];

  if (!route) {
    res.statusCode = 404;
    res.statusMessage = `${req.url} not found`;
    res.end();
  }

  return route(req, res);

}

module.exports = app;