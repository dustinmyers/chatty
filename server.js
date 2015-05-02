var Http = require('http');

var port = 8888;
var messages = [];

var onRequest = function(req, res) {
  if(req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify(messages));
  }
  else if(req.method === 'POST') {
    var postData = '';
    req.on('data', function(chunk) {
      postData += chunk.toString();
    });
    req.on('end', function() {
      var message = JSON.parse(postData)
      var d = new Date().toTimeString();
      message.createdAt = d;
      console.log(message);
      messages.push(message);
      res.end(JSON.stringify(messages));
    });
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
  }
  else if(req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    res.end();
  }
};

Http.createServer(onRequest).listen(port);
console.log('Listening on port ' + port);