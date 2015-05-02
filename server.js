var Http = require('http');
var port = 888;
var messages = ['hello, world'];

var onRequest = function(req, res) {
	if('GET' === req.method) {
		res.writeHead(200, {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		});
		res.end(JSON.stringify(messages))
	} 
	else if('POST' === req.method) {
		var postData = '';
		req.on('data', function	(chunk) {
			postData += chunk.toString();
		});
		req.on('end', function	() {
			var message = JSON.parse(postData);
			var timeStamp = new Date().toTimeString();
			messages.createdAt = timeStamp;
			messages.push(message);
			res.end(JSON.stringify(messages))
		});
		req.writeHead(200, {
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
console.log('I\'m always watching......')