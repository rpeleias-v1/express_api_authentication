var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');
var helmet = require('helmet');
var config = require('./config');

module.exports = function(){
	var app = express();
	var port = process.env.PORT || 8080;
	app.set('port', port)
	app.set('superSecret', config.secret);

	app.use(bodyParser.urlencoded({extended: false}));
	app.use(bodyParser.json());
	app.use(morgan('dev'));
	app.use(methodOverride());

	app.disable('x-powered-by');
	app.use(helmet.xframe());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());

	load('models', {cwd: 'app'})
		.then('controllers')
		.then('routes')
		.into(app);

	return app;
}



