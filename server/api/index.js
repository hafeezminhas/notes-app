/**
 * Created by Hafeez Rehman on 19/01/2020.
 */
const express = require('express');

const authRoutes = require('./auth/auth.routes');
const userRoutes = require('./user/user.routes');
const notesRoutes = require('./note/notes.routes');

const API = express.Router();

API.use('/auth', authRoutes);
API.use('/users', userRoutes);
API.use('/notes', notesRoutes);

module.exports = API;
