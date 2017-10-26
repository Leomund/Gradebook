'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
	name: {
		type: String,
		required: true,
		lowercase: true,
	},
	description: String,
	group: {
		type: String,
		required: true,
		lowercase: true
	},
	subject: {
		type: String,
		required: true,
		lowercase: true
	},
	createdBy: String,
	date: {
		type: Date,
		required: true
	}
});
module.exports = mongoose.model('Activity', ActivitySchema);
