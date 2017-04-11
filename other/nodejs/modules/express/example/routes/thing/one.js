function middleware(res, req) {
  res.send('You called url: /thing/1');
}

module.exports = middleware;
