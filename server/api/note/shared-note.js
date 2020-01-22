/**
 * Created by Hafeez Rehman on 19/01/2020.
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const SharedNoteSchema = new Schema({
	note:		{ type: mongoose.Schema.Types.ObjectId, ref: 'Note', required: true },
	recipient:	{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	sharedOn:	{ type: Date },
	comments:   { type: String }
});

module.exports = mongoose.model('SharedNote', SharedNoteSchema);
