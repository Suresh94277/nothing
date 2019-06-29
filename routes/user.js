const express = require('express')

const router = express.Router()

const user = require('../models/user');

const {check, validationResult} = require('express-validator/check')

<<<<<<< HEAD
var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, callback) => {
		let ext = path.extname(file.originalname);
		// console.log(file.fieldname);
        callback(null, file.fieldname + '-' + Date.now() + ext);
    }
});

var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

var upload = multer({
    storage,
    fileFilter: imageFileFilter,
    limits: { fileSize: 1000000 }
});

router.post('/register',[
		check('email').isEmail(),
		check('password').isLength({min: 6}),
		check('phone').isNumeric(),
		// upload.single('image')
	], async function(request, response) {

	// upload.upload('')
		
=======
router.post('/register',[
		check('email').isEmail(),
		check('password').isLength({min: 6}),
		check('phone').isNumeric()
	], async function(request, response) {

>>>>>>> b181672a2c9c4728141e6f606969f712d535c01e
	const errors = validationResult(request);
	if (!errors.isEmpty()) {
		const messages = errors.array().map(x => `${x.msg} for ${x.param}`)
		return response.status(400).json({message: messages.join('<br>')})
	}

<<<<<<< HEAD
	const result  = await user.countDocuments({email: request.body.email});
	if(result > 0) return response.status(400).json({message: 'User already exists with current email address.'})


=======
	await user.count({email: request.body.email}, function(err, result) {
		if(result > 0) response.status(400).json({message: 'User already exists with current email address.'})
	})
>>>>>>> b181672a2c9c4728141e6f606969f712d535c01e

	if(request.body.password === request.body.password_confirmation) {
		request.body.role = 'guest'
		const newUser = new user(request.body);
		await newUser.save();
<<<<<<< HEAD
		// console.log(request.file, request.body)
		
=======
>>>>>>> b181672a2c9c4728141e6f606969f712d535c01e
		response.status(200).json({
			userId: newUser.id,
			name: newUser.name,
			email: newUser.email,
			role: 'guest'
		})
<<<<<<< HEAD

=======
>>>>>>> b181672a2c9c4728141e6f606969f712d535c01e
	} else {
		response.status(400).json({message: 'Password must be equal with Password Confirmation'})
	}

})

<<<<<<< HEAD
router.post('/upload', upload.single('imageFile'), (req, res) => {
	res.statusCode = 200;
	// res.setHeader('Content-Type', 'application/json');
	res.json(req.file);
})

=======
>>>>>>> b181672a2c9c4728141e6f606969f712d535c01e
module.exports = router