/**
 * Created by Hafeez Rehman on 19/01/2020.
 */
const express = require('express');
const notesRoutes = express.Router();

const notesCtrl = require('./notes.controller');

notesRoutes.get('', notesCtrl.getNotes);
notesRoutes.get('/public', notesCtrl.getPublicNotes);
notesRoutes.post('', notesCtrl.addNote);
notesRoutes.get('/:id', notesCtrl.getNote);
notesRoutes.put('/:id', notesCtrl.updateNote);
notesRoutes.delete('/:id', notesCtrl.deleteNote);
notesRoutes.post('/:id/share', notesCtrl.shareNote);

module.exports = notesRoutes;
