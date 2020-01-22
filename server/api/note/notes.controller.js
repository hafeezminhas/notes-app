/**
 * Created by Hafeez Rehman on 19/01/2020.
 */

const mongoose = require('mongoose');
const httpStatus = require('../../helpers/httpStatus');
const utils = require('../../helpers/utils');

const noteModel = require('./note');
const sharedNoteModel = require('./shared-note');

const ctrl = {};

/**
 * API route: Get Notes with Paginated Results
 * @param {req} req
 * @param {res} res
 * @returns JSON object
 */
ctrl.getNotes = async(req, res) => {
	let page = parseInt(req.query.page || 1) - 1;
	let limit = parseInt(req.body.limit || 10);

	if(req.query.search) {
		const search = utils.escapeRegex(req.query.search, 'gi');
		const results = await noteModel.aggregate({
			title: 1,
			body: 1,
			owner: 1,
			isPrivate: 1,
			createdAt: 1,
			updatedAt: 1
		}).match({ title: search });

		return res.send(results);
	}

	const count = await noteModel.countDocuments({ owner: req.authUser });
	const notes = await noteModel.find({ owner: req.authUser }).populate('owner')
									.skip((limit * page) * page)
									.limit(limit);

	return res.send({
		notes: notes,
		page: page,
		pages: Math.ceil(count/limit),
		total: count
	});
};

/**
 * API route: Get Notes with Paginated Results
 * @param {req} req
 * @param {res} res
 * @returns JSON object
 */
ctrl.getPublicNotes = async(req, res) => {
	let page = parseInt(req.query.page || 1) - 1;
	let limit = parseInt(req.body.limit || 10);

	// if(req.query.search) {
	// 	const search = utils.escapeRegex(req.query.search, 'gi');
	// 	const results = await noteModel.aggregate({
	// 		title: 1,
	// 		body: 1,
	// 		owner: 1,
	// 		isPrivate: 1,
	// 		createdAt: 1,
	// 		updatedAt: 1
	// 	}).match({ title: search });
	//
	// 	return res.send(results);
	// }

	const notes = await sharedNoteModel.find({ isPrivate: false }).populate('owner')
									.skip((limit * page) * page)
									.limit(limit);

	return res.send({
		notes: notes,
		page: page,
		pages: Math.ceil(count/limit),
		total: count
	});
};

/**
 * API route: GET api/notes/{id}
 * @param {req} req
 * @param {res} res
 * @returns JSON object
 */
ctrl.getNote = async(req, res) => {
	let note = await noteModel.findOne({ _id: req.params.id }).populate('owner');
	if(!note) {
		return res.status(httpStatus.NOT_FOUND).json("Note item not found");
	}

	if(!note.isPrivate) {
		return res.json(note);
	}

	if(note.owner._id != req.authUser) {
		const permit = await sharedNoteModel.find({ note: req.params.id, recipient: req.authUser });
		if(!permit.length) {
			return res.status(httpStatus.OK).json({ permission: false, message: 'You do not have permission to access this note.' });
		}
	}

	return res.json(note);
};

/**
 * API route: POST api/notes
 * @param {req} req
 * @param {res} res
 * @returns JSON object
 */
ctrl.addNote = async(req, res) => {
	req.body.owner = mongoose.Types.ObjectId(req.authUser);
	try {
		const result = await noteModel.create(req.body);
		return res.json({ success: true, result });
	} catch(err) {
		console.log(err);
		return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Note creation failed.' });
	}
};

/**
 * API route: PUT api/notes/{id}
 * @param {req} req
 * @param {res} res
 * @returns JSON object
 */
ctrl.updateNote = async(req, res) => {
	let note = await noteModel.findOne({ _id: req.params.id });
	if(!note) {
		return res.json({ success: false, message: 'Target note does not exist' });
	}

	try {
		req.body.updatedAt = Date.now();
		const modified = await noteModel.findByIdAndUpdate(
			{ _id: req.params.id },
			{ $set: req.body },
			{ new: true }
		).populate('owner');

		return res.send(modified);
	} catch (err) {
		console.log(err);
		return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Note update failed' });
	}
};

/**
 * API route: DELETE api/notes/{id}
 * @param {req} req
 * @param {res} res
 * @returns JSON object
 */
ctrl.deleteNote = async(req, res) => {
	let note = await findById(req.params.id);
	if(!note) {
		return res.json({ success: false, message: 'Target note does not exist' });
	}
	const result = await noteMode.findByIdAndDelete(req.params.id);
	res.status(httpStatus.OK).json(result);
};

/**
 * API route: POST api/notes/{id}/share
 * @param {req} req
 * @param {res} res
 * @returns JSON object
 */
ctrl.shareNote = async(req, res) => {
	let note = await noteModel.findOne({ _id: req.params.id });
	if(!note) {
		return res.json({ success: false, message: 'Target note does not exist' });
	}

	const existing = await sharedNoteModel.find({ note: note._id, recipient: req.body.recipient });
	if(existing.length) {
		return res.json({ success: false, message: 'Note already shared with User' });
	}

	req.body.sharedOn = Date.now();

	const result = await sharedNoteModel.create(req.body);
	res.status(httpStatus.OK).json({ success: true, result: result });
};

module.exports = ctrl ;
