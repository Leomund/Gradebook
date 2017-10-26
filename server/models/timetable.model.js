'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TimetableSchema = new Schema({
	group: {
		type: String,
		required: true,
		lowercase: true,
	},
	timetable: [
		[
			{
				type: String
			}
		]
	]
});
module.exports = mongoose.model('Timetable', TimetableSchema);
