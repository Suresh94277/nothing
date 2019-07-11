// use the path of your model
const User = require('../models/user');
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
describe('User register test', () => {
	// the code below is for insert testing
	it('Add user while testing', () => {
		const user = {
			'fullname': 'rakesh sharma',
			'email': 'rakesh@gmail.com',
			'phone': '9820000000',
			'password': 'rakesh123',
			'image': 'imageFile-1561349746957.jpg',
			'role': 'guest'
		};

		return User.create(user)
			.then((user_ret) => {
				expect(user_ret.email).toEqual('rakesh@gmail.com');
			});
	});
	// the code below is for delete testing
	it('to test the delete user is working or not', async () => {
		const status = await User.deleteMany();
		expect(status.ok).toBe(1);
	});

})