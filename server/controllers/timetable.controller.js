var mongoose = require('mongoose');
var Timetable = require('../models/timetable.model');

exports.getByGroup = function(req, res, next) {
	Timetable.findOne({
		group: req.params.group
	}, function(err, timetable) {
		if (err) {
			res.status(500);
			return res.send(err);
		}
		res.json(timetable);
	});
};

exports.createTimetable = function(req, res, next) {
	let newTimetable = new Timetable(req.body);
	newTimetable.save(function(err, timetable) {
		if (err) {
			res.status(500);
			return res.send(err);
		}
		res.json(timetable);
	});
};
exports.updateByGroup = function(req, res, next) {
	Timetable.findOneAndUpdate({
		group: req.params.group
	}, req.body, {
		new: true
	}, function(err, timetable) {
		if (err) {
			res.status(500);
			return res.send(err);
		}
		res.json(timetable);
	});
};
exports.deleteById = function(req, res, next) {
	Timetable.remove({
		_id: req.params.id
	}, function(err, timetable) {
		if (err) {
			res.status(500);
			return res.send(err);
		}
		res.json({
			message: 'Timetable successfully deleted'
		});
	});
};
