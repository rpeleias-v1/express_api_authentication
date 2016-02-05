var express = require('express');
var jwt = require('jsonwebtoken'); //used to create, sign and verify tokens

module.exports = function(app) {
	var controller = app.controllers.user;
	var apiRoutes = express.Router();

	app.route('/').get(controller.apiWelcome);
	app.route('/setup').get(controller.authenticate);
	
	apiRoutes.route('/').get(verifyApiAuthentication, controller.apiWelcome);	
	apiRoutes.route('/users').get(verifyApiAuthentication, controller.getUsers);

	apiRoutes.post('/authenticate', controller.authenticate);

	app.use('/api', apiRoutes);

	function verifyApiAuthentication (req, res, next) {
		var token = req.body.token || req.query.token || req.headers['x-access-token'];

		if (token) {
			jwt.verify(token, app.get('superSecret'), function(err, decoded) {
				if (err) {
					return res.json({success: false, message: 'Failed to authenticate token.'});
				} else {
					req.decoded = decoded;
					next();
				}
			});
		} else {
			return res.status(403).send({
				success: false,
				message: 'No token provided'
			});
		}
	};
}