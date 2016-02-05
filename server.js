var http = require('http');
var app = require('./config/express')();
var config = require('./config/config');
var database = require('./config/database')(config.database);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express Server executando na porta ' + app.get('port'));
});