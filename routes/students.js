const express = require('express')

const router = express.Router()

const student = require('../models/student')

<<<<<<< HEAD
// const fs = require('express-fileupload')
=======
const fs = require('express-fileupload')
>>>>>>> b181672a2c9c4728141e6f606969f712d535c01e

const auth = (request, response, next) => {
	if (!request.user) {
		response.status(403).json({authorised: false})
	} else {
		next()
	}
}

router.get('/', auth, (request, response) => {
	response.json({message: 'You will get student informations'})
})

router.get('/datatable', auth, (request, response) => {
	student.find().exec(function(err, students) {
		if(err) {
			response.status(400).json({message: 'failed to load'})
		} else {
			response.status(200).json(students)
		}
	})
})

router.post('/create', auth, async (request, response) => {
	const newStudent = new student(request.body)
<<<<<<< HEAD
=======
	const saveImage= false
	let path = '/public/uploads/'
	// console.log(request.files)
	// if(Object.keys(request.files).length) {
	// 	// const image = request.files.image
	// 	// path += [image.md5, image.name].join('_')
	// 	// image.mv(path, (err) => {
	// 	// 	if(err) saveImage = true
	// 	// })
	// }
	// if(saveImage) {
	// 	newStudent.image = path
	// }
>>>>>>> b181672a2c9c4728141e6f606969f712d535c01e
	newStudent.save(function(err, result) {
		if(err) {
			response.status(422).json(err)
		} else {
			response.status(201).json(result)
		}
	})
})

router.get('/findById/:id', (request, response) => {
	student.findById(request.params.id, (err, result) => {
		if(err) result = {}
		response.status(200).json(result)
	})
})

router.get('/findByClass/:class', (request, response) => {
	student.find({standard: request.params.class}, (err, result) => {
		if(err) result = {}
		response.status(200).json(result)
	})
})


router.post('/update/:id', auth, (request, response) => {
	student.findById(request.params.id, (err, doc) => {
		if(err) {
			response.status(400).json(err)
		} else {
			for(let [name, value] of Object.entries(request.body)) {
				doc[name] = value
			}
			doc.save(function(err, result) {
				if(err) {
					response.status(400).json(err)
				} else {
					response.status(200).json(result)
				}
			})
		}
	})
})

router.post('/delete/:id', auth, (request, response) => {
	student.findById(request.params.id, (err, doc) => {
		if(err) {
			response.status(400).json(err)
		} else {
			
			doc.delete(function(err, result) {
				if(err) {
					response.status(400).json(err)
				} else {
					response.status(200).json(result)
				}
			})
		}
	})
})
<<<<<<< HEAD

router.get('/image/:image', (request, response) => {
	const path = __dirname.substr(0, __dirname.lastIndexOf('\\'))
	response.sendFile(path + '/public/uploads/' + request.params.image)
});

=======
>>>>>>> b181672a2c9c4728141e6f606969f712d535c01e
module.exports = router