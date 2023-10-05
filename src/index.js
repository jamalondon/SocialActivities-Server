//require Mongoose models;
require('./models/User');
//const Activity = require("./src/models/Activites");

//express API server
const express = require('express');
//libraray to connect to mongoDB
const mongoose = require('mongoose');
//library that helps API read json
const bodyParser = require('body-parser');
//API monitoring
const morgan = require('morgan');

//router routes and middlewares
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

//create the express variable to handle routes and middlewares
const app = express();

//use these middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
//log what time the req was made to the server
app.use((req, res, next) => {
	req.requestTime = new Date().toISOString;
	next();
});

//handle authRoutes and activityRoutes
app.use('/API/v1/auth', authRoutes);

//handle root route, and redirect to authRoute
app.get('/', requireAuth, (req, res) => {
	res.send(`Your email: ${req.user.email}`);
});

// Add a new activity
app.post('/activities', (req, res) => {
	const activity = new Activity(req.body);

	activity
		.save()
		.then(() => res.sendStatus(201))
		.catch((err) => {
			console.error('Failed to save activity:', err);
			res.sendStatus(500);
		});
});

module.exports = app;
