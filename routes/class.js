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
<<<<<<< HEAD
    response.json(['English', 'Nepali', 'Science', 'Social', 'Math', 'health', 'Acccount', 'Computer'])
=======
    response.json(['English', 'Nepali', 'Science', 'Social', 'Math'])
>>>>>>> b181672a2c9c4728141e6f606969f712d535c01e
})


module.exports = router