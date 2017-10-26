var express = require('express');
var passport = require('passport');
var usersController = require('../controllers/users.controller');
var activitiesController = require('../controllers/activities.controller');
var timetableController = require('../controllers/timetable.controller')
var authController = require('../controllers/auth.controller');
var router = express.Router();


//users
router.get('/users', admin, usersController.getAll);
router.get('/students', teacher, usersController.getStudents);
router.get('/user/:id', admin, usersController.getById);
router.post('/user', admin, usersController.createUser);
router.put('/user/:id', teacher, usersController.updateById);
router.delete('/user/:id', admin, usersController.deleteById);

//activities
router.get('/activities', teacher, activitiesController.getByDate);
router.post('/activity', teacher, activitiesController.createActivity);
router.delete('/activity/:id', teacher, activitiesController.deleteById);
router.put('/activity/:id', teacher, activitiesController.updateById);

router.get('/groups', activitiesController.getGroups);
router.get('/subjects', activitiesController.getSubjects);

//timetable
router.get('/timetable/:group', timetableController.getByGroup);
router.post('/timetable', timetableController.createTimetable);
router.put('/timetable/:group', timetableController.updateByGroup);

//auth
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/authcheck', authController.check)

function admin(req, res, next) {
	if (req.isAuthenticated() && req.user.role === 'admin') {
		next()
	} else {
		res.status(403);
		res.json({
			message: 'admin only'
		});
	}
}

function teacher(req, res, next) {
	if (req.isAuthenticated() && req.user.role === 'admin' || req.user.role === 'teacher') {
		next()
	} else {
		res.status(403);
		res.json({
			message: 'teacher and up'
		});
	}
}

module.exports = router;
