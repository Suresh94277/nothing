// use the path of your model
const Result = require('../models/result');
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
describe('Result  register test', () => {
	// the code below is for insert testing
	it('Add result while testing', () => {
		const result = {
			'standard': 'Three',
			'date': '2019-06-27',
			'term': "First Term",
			'serial_number':'20001',
			'subjects':[
				{'subject':'Math',
				'full_marks':'100',
				'pass_marks':'40',
				'obtained_marks':'60',
				'total_marks':'60',
				'remarks': 'p','id': '22222',
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

				

			}, {
				'subject':'English',
				'full_marks':'100',
				'pass_marks':'40',
				'obtained_marks':'60',
				'total_marks':'60',
				'remarks': 'p','id': '22222',
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
			}
			]		
		};

		return Result.create(result)
			.then((result_ret) => {
                expect(result_ret.standard).toEqual('Three');
                expect(result_ret.term).toEqual('First Term');
                expect(result_ret.date).toEqual(new Date('2019-06-27'));
                expect(result_ret.serial_number).toEqual('20001');
                expect(result_ret.subjects[0].subject).toEqual('Math');
			});
	});
	// the code below is for delete testing
	it('to test the delete user is working or not', async () => {
		const status = await Result.deleteMany();
		expect(status.ok).toBe(1);
	});

})