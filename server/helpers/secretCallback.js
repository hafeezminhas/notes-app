/**
 * Created by Hafeez Rehman on 19/01/2020.
 */
const userModel = require('../api/user/user');
const httpStatus = require('./httpStatus');
// const AppError = require('../utils/appError');

module.export = function (req, payload, done) {
	let sub = payload.sub;
	console.log(payload);

	userModel.findById(sub, function (err, user) {
		if (err || !user) {
			return done(new Error('Invalid user', httpStatus.UNAUTHORIZED))
		}
		console.log(user);
		return done(null, user.secret)
	});
};
