'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var bcrypt = require('bcryptjs');

var UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		index: true
	},
	name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		enum: ['admin', 'teacher', 'student']
	},
	group: {
		type: String
	},
	marks: [
		{
			_id: false,
			id: String,
			value: Number
		}
	]
});


//TODO: add password encryption

// UserSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//
//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(this.password, salt);
//
//   this.password = hash;
//   next();
// });
//
UserSchema.methods.comparePasswords = function(password) {
	return password === this.password;
};

module.exports = mongoose.model('User', UserSchema);
