// use the path of your model
const Student = require('../models/student');
const mongoose = require('mongoose');
// use the new name of the database
const url = 'mongodb://localhost:27017/resultmanagement';
beforeAll(async () => {
	await mongoose.connect(url, {
		useNewUrlParser: true,
		useCreateIndex: true
	});
});
afterAll(async () => {
	await mongoose.connection.close();
});
describe('Student register test', () => {
	// the code below is for insert testing
	it('Add user while testing', () => {
		const student = {
			'id': '22222',
			'fname': 'sabita',
			'mname': 'kumari',
			'lname': 'shah',
			'standard': 'Three',
            'parent_name': 'hari shah',
            'parent_phone': '9820000000',
            'dob': '2019-06-27',
            'gender': 'Male',
            'address': 'rukum',
            'blood_group': 'A+',
            'image':'imageFile-1561349746957.jpg'
		};

		return Student.create(student)
			.then((student_ret) => {
                expect(student_ret.fname).toEqual('sabita');
                expect(student_ret.mname).toEqual('kumari');
                expect(student_ret.lname).toEqual('shah');
                expect(student_ret.standard).toEqual('Three');
                expect(student_ret.parent_name).toEqual('hari shah');
			});
	});
	// the code below is for delete testing
	it('to test the delete user is working or not', async () => {
		const status = await Student.deleteMany();
		expect(status.ok).toBe(1);
	});

})