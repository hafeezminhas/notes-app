/**
 * Created by Hafeez Rehman on 19/01/2020.
 */
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jsonWebToken = require('jsonwebtoken');
const helmet = require('helmet');
const path = require('path');

const httpStatus = require('./helpers/httpStatus');
const secretCallback = require('./helpers/secretCallback');
const connectDB = require('./config/database');
require('zone.js/dist/zone-node');

const API = require('./api');

const app = express();

app.use(bodyParser.json());
app.use(helmet());

app
	.use('/api',
		jwt({
			secret: process.env.JWT_SECRET,
			getToken: function fromHeaderOrQuerystring (req) {
				if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
					var decoded = jsonWebToken.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
					req.authUser = decoded.sub;
					return req.headers.authorization.split(' ')[1];
				}
				return null;
			}
		})
		.unless({
			path: [
				'/api/auth/login',
				'/api/auth/signup',
				'/public'
			],
			requestProperty: 'auth'
		})
	);

app.use('/api', API);
app.use(express.static(path.join(__dirname, 'public')));
app.all("/*", serveStatic);

app.use(function (req, res, next) {
	throw new Error(`Resource not found`, httpStatus.NOT_FOUND)
});

connectDB();
// app.use(errorHandler);

function serveStatic (req, res) {
	res
		.status(200)
		.set({ 'content-type': 'text/html; charset=utf-8' })
		.sendFile(path.join(__dirname, "public/index.html"));
}

module.exports = app;
