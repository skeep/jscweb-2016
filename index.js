var http = require('http');

var server = http.createServer(function(req, res) {
  res.write("Hello from JS Channel");
  res.end();
});

server.listen(process.env.PORT || 5000);
