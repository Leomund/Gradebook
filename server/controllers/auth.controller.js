var passport = require('passport');
var User = require('../models/user.model')

exports.login = function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) {
			res.status(500);
			return next(err)
		}
		if (!user) {
			return res.json(info)
		}
		req.login(user, function(err) {
			if (err) {
				res.status(500);
				return next(err);
			}
			user.password = null;
			return res.json(user);
		})
	})(req, res, next);
}


exports.logout = function(req, res, next) {
	req.logout();
	res.json({
		message: 'Logout success'
	});
}

exports.check = function(req, res, next) {
	res.json({
		authenticated: req.isAuthenticated()
	})
}
