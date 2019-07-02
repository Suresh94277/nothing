const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	name	: String,
	email	: String,
	phone	: String,
	password: String,
	role	: String,
	notifications: Number
}, { timestamp: true })

userSchema.pre('save', function(next) {
	const user = this
	if (!user.isModified('password')) return next()
	bcrypt.hash(user.password, 10).then(password => {
		user.password = password
		next();
	})
}, err => next(err))

userSchema.methods.comparePassword = function(candidatePassword, next) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) return next(err)
		next(null, isMatch);
	})
}

module.exports = mongoose.model('users', userSchema)