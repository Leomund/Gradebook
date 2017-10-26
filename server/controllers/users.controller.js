var mongoose = require('mongoose');
var User = require('../models/user.model');

exports.getAll = function(req, res, next) {
	User.find({}, function(err, user) {
		if (err) {
			return res.send(err);
		}
		res.json(user);
	});
};

exports.getStudents = function(req, res, next) {
	User.find({
		role: 'student'
	}, function(err, user) {
		if (err) {
			return res.send(err);
		}
		res.json(user);
	});
};

exports.getById = function(req, res, next) {
	User.findById(req.params.id, function(err, user) {
		if (err) {
			res.status(500);
			return res.send(err);
		}
		res.json(user);
	});
};
exports.createUser = function(req, res, next) {
	let newUser = new User(req.body);
	newUser.save(function(err, user) {
		if (err) {
			res.status(500);
			return res.send(err);
		}
		res.json(user);
	});
};
exports.updateById = function(req, res, next) {
	User.findOneAndUpdate({
		_id: req.params.id
	}, req.body, {
		new: true
	}, function(err, user) {
		if (err) {
			res.status(500);
			return res.send(err);
		}
		res.json(user);
	});
};
exports.deleteById = function(req, res, next) {
	User.remove({
		_id: req.params.id
	}, function(err, user) {
		if (err) {
			res.status(500);
			return res.send(err);
		}
		res.json({
			message: 'User successfully deleted'
		});
	});
};
