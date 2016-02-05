var mongoose = require('mongoose');

module.exports = function(uri) {

	mongoose.connect(uri);

	mongoose.connection.on('connected', function() {
		console.log('Mongoose! Connected on ' + uri);
	});

	mongoose.connection.on('disconnected', function() {
		console.log('Mongoose! Disconnected on ' + uri);
	});

	mongoose.connection.on('error', function() {
		console.log('Mongoose! Error on ' + uri);
	});

	process.on('SIGINIT', function() {
		console.log('Mongoose! Disconnected by application end');
		process.exit(0);
	});
}