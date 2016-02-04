var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken'); //used to create, sign and verify tokens
var config = require('./config');
var User = require('./app/models/user');

var port = process.env.PORT || 8080;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.get('/', function(req, res) {
	res.send('Hello! The API is at http://localhost: ' + port + '/api');
});

app.get('/setup', function(req, res) {
	var rodrigo = new User({
		name: 'Rodrigo Peleias',
		password: 'password',
		admin: true
	});

	rodrigo.save(function(err) {
		if(err) throw err;
		console.log('USer saved successfully');
		res.json({success: true});
	});
});

var apiRoutes = express.Router();

apiRoutes.get('/', function(req, res) {
	res.json({message: 'welcome to the coolest API on earth!'});
})

apiRoutes.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users);
	});
});

app.use('/api', apiRoutes);

app.listen(port);
console.log('Magic happens at http://localhost:' + port);