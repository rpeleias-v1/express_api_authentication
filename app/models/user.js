var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
	var UserSchema = mongoose.Schema({
		name: String,
		password: String,
		admin: Boolean
	});

	return mongoose.model('User', UserSchema);
}