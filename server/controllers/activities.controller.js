var mongoose = require('mongoose');
var Activity = require('../models/activity.model');
var User = require('../models/user.model');

// exports.getAll = function(req, res, next) {
// 	Promise.all([
// 		Activity.find({
// 				date: req.query
// 			})
// 			.exec(),
// 		Activity.find()
// 			.distinct('group')
// 			.exec()
// 		User.find()
// 			.distinct('group')
// 			.exec()
// 		])
// 		.then(function(data) {
// 			console.log(results);
//
// 			res.json({
// 				lectures: data[0],
// 				groups: data[1].concat(data[2])
// 			});
// 		})
// 		.catch(function(err) {
// 			res.send(err);
// 		});
// };

exports.getAll = function(req, res, next) {
	Activity.find({}, function(err, activity) {
		if (err) {
			res.status(500)
			return res.send(err);
		}
		res.json(activity);
	});
};

exports.getByDate = function(req, res, next) {
	Activity.find({
		date: req.query
	}, function(err, activity) {
		if (err) {
			res.status(500);
			return res.send(err);
		}
		res.json(activity);
	});
};

exports.getGroups = function(req, res, next) {
	Activity.find()
		.distinct('group', function(err, aGroups) {
			if (err) {
				res.status(500);
				return res.send(err);
			}
			User.find()
				.distinct('group', function(err, uGroups) {
					if (err) {
						res.status(500);
						return res.send(err);
					}
					let groups = aGroups.concat(uGroups);
					groups = groups.filter((x, i, a) => a.indexOf(x) == i);
					res.json(groups);
				});
		});
};

exports.getSubjects = function(req, res, next) {
	Activity.find()
		.distinct('subject', function(err, groups) {
			if (err) {
				res.status(500);
				return res.send(err);
			}
			res.json(groups);
		});
};

exports.createActivity = function(req, res, next) {
	req.body.createdBy = req.user.name;
	let newActivity = new Activity(req.body);
	newActivity.save(function(err, activity) {
		if (err) {
			res.status(500);
			return res.send(err);
		}
		res.json(activity);
	});
};

exports.updateById = function(req, res, next) {
	console.log(123)
	Activity.findOneAndUpdate({
		_id: req.params.id
	}, req.body, {
		new: true
	}, function(err, activity) {
		if (err) {
			res.status(500);
			return res.send(err);
		}
		res.json(activity);
	});

};

exports.deleteById = function(req, res, next) {
	Activity.findOneAndRemove({
		_id: req.params.id
	}, function(err, activity) {
		if (err) {
			res.status(500);
			return res.send(err);
		}
		User.updateMany({}, {
			$pull: {
				marks: {
					id: activity._id
				}
			}
		}, function(err, user){
		})
		res.json({
			message: 'User successfully deleted'
		});
	});
};
