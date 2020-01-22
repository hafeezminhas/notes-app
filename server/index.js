/**
 * Created by Hafeez Rehman on 19/01/2020.
 */
const debug = require('debug');
require('dotenv').config();
const log = debug('app');

const app  = require('./app');
console.clear();

log('Server initializing ... ');

app.listen(process.env.PORT, () => {
	console.log(`Server running on http://localhost:${process.env.PORT}`)
});
