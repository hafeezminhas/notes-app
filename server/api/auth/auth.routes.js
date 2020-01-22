/**
 * Created by Hafeez Rehman on 19/01/2020.
 */
const express = require('express');
const authRoutes = express.Router();

const authCtrl = require('./auth.controller');

authRoutes.post('/login', authCtrl.login);
authRoutes.post('/signup', authCtrl.register);

module.exports = authRoutes;
