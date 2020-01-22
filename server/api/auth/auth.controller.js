/**
 * Created by Hafeez Rehman on 19/01/2020.
 */
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const httpStatus = require('../../helpers/httpStatus');
const userModel = require('../user/user');

const auth = {};

auth.login = async(req, res) => {
	let user = await userModel.findOne({ email: req.body.email });

	if(!user) {
		return res.status(httpStatus.UNAUTHORIZED).json({ message: 'User does not exists' });
	}

	let isMatch = await user.matchPassword(req.body.password);
	if (!isMatch) return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid username/password' });

	let randomSecret = crypto.randomBytes(32).toString('hex');

	await userModel.updateOne({ _id: user._id }, { $set: { secret: randomSecret } });

	let token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

	const { password, __v, secret, ...exposedUser } = user.toObject();

	return res.json({ data: { token, user: exposedUser } });
};

auth.register = async(req, res) => {
	let user = await userModel.findOne({ email: req.body.email }, {}).catch(err => {
		console.log(err);
	});


	if(user) {
		return res.status(httpStatus.CONFLICT).json({ type: 'duplicate', message: 'User already exists' });
	}

	let errors = [];

	if(req.body.password !== req.body.confirm) {
		errors.push({ text: 'password and conform password do not match.' });
	}

	if(req.body.password.length < 6) {
		errors.push({ text: 'password must be at least 6 characters long.' });
	}

	if(errors.length) {
		return res.json({ success: false, errors: errors });
	} else {
		let newUser = new userModel(req.body);
		// req.body.password = await userModel.encryptPassword(req.body.password);
		console.log(req.body.password);
		let user = await userModel.create(req.body).catch(err =>{
			return res.status(httpStatus.INTERNAL_SERVER_ERROR).error({ message: 'Server error occurred while signing up user.' });
		});

		return res.status(httpStatus.CREATED).json({ success: true, user: user, message: 'User registration successful' });
	}
};

module.exports = auth ;
