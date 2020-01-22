/**
 * Created by Hafeez Rehman on 19/01/2020.
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
	title:		{ type: String, required: true },
	body:		{ type: String, required: true },
	owner:		{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	isPrivate:	{ type: Boolean, default: true },
	deleted:	{ type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);
