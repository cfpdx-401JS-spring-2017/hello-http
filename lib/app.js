function app(req, res) {
  console.log(req.url);

  if (req.url === '/') {
    res.end('hit home!');
  } else if (req.url === '/fact') {
    res.end('HTTP is a set of standards that allow users of the World Wide Web to exchange information found on web pages');
  } else {
    res.end('404: not found');
  }

}

module.exports = app;