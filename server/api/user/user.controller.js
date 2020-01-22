/**
 * Created by Hafeez Rehman on 20/01/2020.
 */
const httpStatus = require('../../helpers/httpStatus');
const userModel = require('./user');

const sharedNotesModel = require('../note/shared-note');

const ctrl = {};

/**
 * API route: PUT api/users/{id}
 * @param {req} req
 * @param {res} res
 * @returns JSON object
 */
ctrl.updateUser = async (req, res) => {
	return res.status(httpStatus.NOT_IMPLEMENTED).json({ message: 'feature not implemented' });
};

/**
 * API route: GET api/users/sharednotes
 * @param {req} req
 * @param {res} res
 * @returns JSON object
 */
ctrl.getSharedNotes = async (req, res) => {
	const result = await sharedNotesModel.find({ recipient: req.authUser }).populate('note');
	return res.status(httpStatus.OK).json(result);
};

ctrl.searchUsers = async (req, res) => {
	let result;

	if(!req.query.search) {
		result = await userModel.aggregate([{
			'$project' : {
				'name' : {'$concat' : [ '$firstName', ' ' ,'$lastName' ]}
			}
		}]).limit(5);
		result = result.filter(u => { return u._id != req.authUser });

		return res.json(result);
	}

	var searchString = new RegExp(req.query.search, 'ig');
	result = await userModel.aggregate()
		.project({
			'name' : {'$concat' : [ '$firstName', ' ' ,'$lastName' ]}
		})
		.match({ name: searchString }).limit(5);

	result = result.filter(u => { return u._id != req.authUser });
	return res.json(result);
};

module.exports = ctrl;
