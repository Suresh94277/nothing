const express = require('express')

const router = express.Router()

const teacher = require('../models/user')

const auth = (request, response, next) => {
	if (!request.user) {
		response.status(403).json({authorised: false})
	} else {
		next()
	}
}

router.get('/datatable',auth, (request, response) => {
	teacher.find().exec(function(err, results) {
		if(err) {
			response.status(400).json({message: 'failed to load'})
		} else {
			response.status(200).json(results)
		}
	})
})

router.get('/findById/:id', (request, response) => {
	teacher.findById(request.params.id, (err, result) => {
		if(err) result = {}
		response.status(200).json(result)
	})
})


router.post('/update/:id', auth, (request, response) => {
	teacher.findById(request.params.id, (err, doc) => {
		if(err) {
			response.status(400).json(err)
		} else {
			doc.role = request.body.role
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

module.exports = router