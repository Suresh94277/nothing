const express = require('express')

const router = express.Router()

const result = require('../models/result')
const student = require('../models/student')
const user = require('../models/user')
const notification = require('../models/notification')
const feedback = require('../models/feedback')
const moment = require('moment')

const auth = (request, response, next) => {
	if (!request.user) {
		response.status(403).json({authorised: false})
	} else {
		next()
	}
}

router.get('/datatable', auth, (request, response) => {
    result.find().exec((err, results) => {
        if(err) {
            response.status(400).json(err)
        } else {
            response.status(200).json(results)
        }
    })
})

router.get('/findById/:id', (request, response) => {
	result.findById(request.params.id, (err, result) => {
		if(err) result = {}
		response.status(200).json(result)
	})
})

router.get('/findBySerialNum/:number', (request, response) => {
	result.findOne({serial_number: request.params.number}, (err, result) => {
        if(err) return response.send('Sorry, result can not load due to system failure.')
        if(result) {
            let res = ''
            const failed = result.subjects.filter(x => x.obtained_marks < x.pass_marks)
            res = failed.length ? 'Sorry, you have failed.' 
                                : 'Congratulation, you have passed.'
            if(failed.length) response.status(201).send(res)
            else response.status(200).send(res)
        } else {
            response.send('Result is not published yet. Please try again after result is published')
        }
		// response.status(200).json(result)
	})
})

router.get('/findBySerialNum/:number/:dob', (request, response) => {
    const dates = request.params.dob.split('-');
    result.findOne({serial_number: request.params.number, 
        "student.dob": {
            "$gte": new Date(dates[0], Number(dates[1])-1, dates[2]), 
            "$lte" : new Date(dates[0], Number(dates[1])-1, Number(dates[2])+1)
        }
    }, (err, result) => {
        if(err) return response.send('Sorry, result can not load due to system failure.')
        if(result) {
            response.send(result)
        } else {
            response.send('Result is not published yet. Please try again after result is published')
        }
		// response.status(200).json(result)
	})
})

router.post('/create', auth, async (request, response) => {
    const newResult = new result(request.body)
    const data = [];
    for(let [field, arr] of Object.entries(request.body.subjects)) {
        for(let key in arr) {
            const temp = {}
            for(let [field, arr] of Object.entries(request.body.subjects)) {
                temp[field] = arr[key]
            }
            data.push(temp)
        }
        break
    }
    newResult.subjects = data
    newResult.student = await student.findOne({id: request.body.student.id})
    const parent = await user.findOne({phone: newResult.student.parent_phone})
    newResult.save(async function(err, status) {
        if(err) {
            response.status(400).json(err)
        } else {
            if(parent) {
                const note = new notification({
                    message: 'Result has been published held on ' 
                    + moment(newResult.date).format('MM/DD/YYYY'),
                    user_id: parent.id,
                })
                await note.save()
            }
            response.status(200).json(newResult)
        }
    })
})

router.post('/update/:id', auth, (request, response) => {
    result.findById(request.params.id, (err, doc) => {
        if(err) return response.status(400).json(err)
        const data = [];
        for(let [field, arr] of Object.entries(request.body.subjects)) {
            for(let key in arr) {
                const temp = {}
                for(let [field, arr] of Object.entries(request.body.subjects)) {
                    temp[field] = arr[key]
                }
                data.push(temp)
            }
            break
        }
        doc.subjects = data
        doc.save((err, status) => {
            if(err) return response.status(400).json(err)
            response.status(200).json(doc)
        })
    })
})

router.post('/delete/:id', auth, (request, response) => {
    result.findById(request.params.id, (err, doc) => {
        if(err) return response.status(400).json(err)
        doc.delete((err, status) => {
            if(err) return response.status(400).json(err)
            response.status(200).json(doc)
        })
    })
})

router.get('/notifications/:id', (req, res) => {
    notification.find({user_id: req.params.id}, null, {sort: {createdAt: -1}})
    .exec((err, results) => {
        if(err) return res.status(400).json(err)
        res.status(200).json(results)
    })
})

router.get('/feedbacks/:number', auth, (req, res) => {
    feedback.find({
        user_id: req.user.id,
        serial_number: req.params.number
    }, null, {
        sort: {
            createdAt: -1
        }
    }).exec((err, results) => {
        if(err) return res.status(400).json(err)
        res.json(results)
    })
})

router.post('/feedback-save', auth, (req, res) => {

   

    const feed = new feedback(req.body)
    feed.user_id = req.user.id
    feed.user = req.user
    feed.save((err, status) => {
        if(err) return res.status(400).json(err)
        res.status(200).json({message: 'Feedback stored successfully.'})
    })
})


module.exports = router