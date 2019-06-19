const express = require('express')

const router = express.Router()

router.get('/list', (request, response) => {
	response.json([
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
    ])
})

router.get('/blood-group', (request, response) => {
	response.json([
        {id: 'A+', text: 'A+'},
        {id: 'A-', text: 'A-'},
        {id: 'B+', text: 'B+'},
        {id: 'B-', text: 'B-'},
        {id: 'AB+', text: 'AB+'},
        {id: 'AB-', text: 'AB-'},
        {id: 'O+', text: 'O+'},
        {id: 'O-', text: 'O-'}
    ])
})

router.get('/subjects', (request, response) => {
    response.json(['English', 'Nepali', 'Science', 'Social', 'Math'])
})


module.exports = router