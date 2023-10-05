const mongoose = require('mongoose');

// Define activity schema
const activitySchema = new mongoose.Schema({
	title: String,
	description: String,
	date: Date,
	createdBy: String,
});

// Define activity model
mongoose.model('Activity', activitySchema);
