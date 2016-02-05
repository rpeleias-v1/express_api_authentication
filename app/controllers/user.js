var jwt = require('jsonwebtoken'); //used to create, sign and verify tokens

module.exports = function(app) {
	var controller = {};
	var User = app.models.user;

	controller.apiWelcome = function(req, res) {
		res.json({message: 'welcome to the coolest API on earth!'});
	};

	controller.authenticate = function(req, res) {
		User.findOne({
			name: req.body.name
		}, function(err, user) {
			if(err) throw err;

			if(!user) {
				res.json({success: false, message: 'Authentication failed. User not found'});
			} else if(user) {
				if (user.password != req.body.password) {
					res.json({success: false, message: 'Authentication failed. Wrong password'});
				} else {
					var token = jwt.sign(user, app.get('superSecret'), {
						expiresInMinutes: 1440
					});

					res.json({
						success: true,
						message: 'Enjoy your token',
						token: token
					});
				}
			}
		});
	};

	controller.setupUser = function(req, res) {
		var rodrigo = new User({
			name: 'Rodrigo Peleias',
			password: 'password',
			admin: true
		});

		rodrigo.save(function(err) {
			if(err) throw err;
			console.log('User saved successfully');
			res.json({success: true});
		});
	};

	controller.getUsers = function(req, res) {
		User.find({}, function(err, users) {
			res.json(users);
		});
	};

	return controller;
}