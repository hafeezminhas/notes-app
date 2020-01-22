/**
 * Created by Hafeez Rehman on 19/01/2020.
 */
const express = require('express');
const userRoutes = express.Router();

const userCtrl = require('./user.controller');

userRoutes.get('/sharedNotes', userCtrl.getSharedNotes);
userRoutes.get('/search', userCtrl.searchUsers);
userRoutes.put('', userCtrl.updateUser);

module.exports = userRoutes;
