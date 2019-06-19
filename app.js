const express = require('express')
const jwt = require('jsonwebtoken')
const session = require('express-session')
const user = require('./models/user')
const key = require('./auth/key')
require('./DB/mongoose')

const app = express()
// app.use(require('body-parser').json())
app.use(require('body-parser').urlencoded({
  extended: true
}))

app.use(require('express-fileupload')())

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      //respond with 200
      res.sendStatus(200)
    }
    else {
    //move on
      next()
    }
})

app.use(function (req, res, next) {
	try {
		const token = req.headers.authorization.split(" ")[1]
		jwt.verify(token, key.tokenKey, function(err, payload) {
			if (payload) {
				user.findById(payload.userId).then(doc => {
					req.user = doc
					next()
				})
			} else  {
				next()
			}
		})
	} catch(e) {
		next()
	}
})

app.post('/api/auth/signin', function(request, response) {
	user.findOne({email: request.body.email}).then(user => {
		user.comparePassword(request.body.password, (err, isMatched) => {
			if(isMatched) {
				const token = jwt.sign({userId: user.id}, key.tokenKey)
				response.status(200).json({
					userId: user.id,
					username: user.username,
					name: user.name,
					role: user.role,
					token
				})
			} else {
				response.status(400).json({message: 'Invalid password / username'})
			}
		})
	}).catch(err => response.status(400).json({message: 'Invalid password / username'}))
})

app.get('/api/auth/check', async function(request, response) {
	if(request.user) {
		request.user.notifications = await require('./models/notification')
											.countDocuments({user_id: request.user.id})
		request.user.password = ''
	}
	response.json({auth: !!request.user, user: request.user})
})
// app.options()


const studentRouter = require('./routes/students')
app.use('/api/students', studentRouter)

const userRouter = require('./routes/user')
app.use('/api/users', userRouter)

const classRouter = require('./routes/class')
app.use('/api/classes', classRouter)

const resultRouter = require('./routes/results')
app.use('/api/results', resultRouter)

const teacherRouter = require('./routes/teachers')
app.use('/api/teachers', teacherRouter)


app.post('/setup', (request, response) => {
	user.countDocuments(async (err, result) => {
		if(result === 0) {
			const Admin = new user({
				name	: 'Admin',
				email	: 'admin@management.com',
				password: 'admin',
				role	: 'admin'
			})
			await Admin.save()

			const faker = require('faker')
			const student = require('./models/student')
			const standards = [
				{id: 'Nursery', text: 'Nursery'},
				{id: 'LKG', text: 'LKG'},
				{id: 'UKG', text: 'UKG'},
				{id: 'One', text: 'One'},
				{id: 'Two', text: 'Two'},
				{id: 'Three', text: 'Three'},
				{id: 'Four', text: 'Four'},
				{id: 'Five', text: 'Five'},
				{id: 'Six', text: 'Six'},
				{id: 'Seven', text: 'Seven'},
				{id: 'Eight', text: 'Eight'},
				{id: 'Nine', text: 'Nine'}
			]
			const blood_groups = [
				{id: 'A+', text: 'A+'},
				{id: 'A-', text: 'A-'},
				{id: 'B+', text: 'B+'},
				{id: 'B-', text: 'B-'},
				{id: 'AB+', text: 'AB+'},
				{id: 'AB-', text: 'AB-'},
				{id: 'O+', text: 'O+'},
				{id: 'O-', text: 'O-'}
			]

			for(let i = 0; i < 1000; i++) {
				let newStudent = new student({
					id: i.toString().padStart(6, '0'),
					fname: faker.name.firstName(),
					fmname: '',
					lname: faker.name.lastName(),
					dob: faker.date.past(),
					parent_name: faker.name.findName(),
					parent_phone: faker.phone.phoneNumber().replace(/([- \(\)])/g, '').replace(/\./g, '').split('x')[0],
					standard: standards[i % standards.length].id,
					address: [faker.address.streetAddress(), faker.address.city()].join(', '),
					blood_group: blood_groups[i % blood_groups.length].id,
					gender: ['Male', 'Female', 'Other'][i % 3]
				})
				await newStudent.save()
			}
			response.send('Setup Completed.')
		} else {
			response.send('Setup is already done.')
		}
	})
})

app.listen(5000, () => console.log('Api Servier Started'))