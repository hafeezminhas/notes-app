/**
 * Created by Hafeez Rehman on 18/01/2020.
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	date: { type: Date, default: Date.now }
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
	let user = this;
	if(!user.isModified('password'))
		return next();
	let hashedPwd = await bcrypt.hash(user.password, 10);
	user.password = hashedPwd;

	next();
});

UserSchema.pre('create', async function(next) {
	let user = this;
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(password, salt);
	next();
});

UserSchema.methods.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	return hash;
};

UserSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
