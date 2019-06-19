const express = require('express')

const router = express.Router()

const user = require('../models/user');

const {check, validationResult} = require('express-validator/check')

router.post('/register',[
		check('email').isEmail(),
		check('password').isLength({min: 6}),
		check('phone').isNumeric()
	], async function(request, response) {

	const errors = validationResult(request);
	if (!errors.isEmpty()) {
		const messages = errors.array().map(x => `${x.msg} for ${x.param}`)
		return response.status(400).json({message: messages.join('<br>')})
	}

	await user.count({email: request.body.email}, function(err, result) {
		if(result > 0) response.status(400).json({message: 'User already exists with current email address.'})
	})

	if(request.body.password === request.body.password_confirmation) {
		request.body.role = 'guest'
		const newUser = new user(request.body);
		await newUser.save();
		response.status(200).json({
			userId: newUser.id,
			name: newUser.name,
			email: newUser.email,
			role: 'guest'
		})
	} else {
		response.status(400).json({message: 'Password must be equal with Password Confirmation'})
	}

})

module.exports = router