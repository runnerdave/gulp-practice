var StaticServer = require('static-server');
var server = new StaticServer({
	port: 3000,
	rootPath: './public'
});

server.start(function() {
	console.log('Server listening to', server.port);
});