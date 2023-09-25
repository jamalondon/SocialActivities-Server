require('./models/User');
//const Activity = require("./src/models/Activites");

//express API server
const express = require('express');
//libraray to connect to mongoDB
const mongoose = require('mongoose');
//library that helps API read json
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();
app.use(express.json());

const port = 3000;

app.use(bodyParser.json());
app.use(authRoutes);

mongoose.set('strictQuery', false);
//URI used to connect to mongoDB
const mongoURI =
	'mongodb+srv://admin:0iHsSj1x0ppU5cY@socialactivites.epw0m.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose
	.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.error('Failed to connect to MongoDB:', err));

//handle root route, and redirect to authRoute
app.get('/', requireAuth, (req, res) => {
	res.send(`Your email: ${req.user.email}`);
});

// Add a new activity
app.post('/activities', (req, res) => {
	const { title, description, time, date } = req.body;
	const activity = new Activity({ title, description, time, date });

	activity
		.save()
		.then(() => res.sendStatus(201))
		.catch((err) => {
			console.error('Failed to save activity:', err);
			res.sendStatus(500);
		});
});

/* Get activities within a date range
app.get("/activities", (req, res) => {
  const { startDate, endDate } = req.query;
  const query = {};

  if (startDate && endDate) {
    query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
  } else if (startDate) {
    query.date = { $gte: new Date(startDate) };
  } else if (endDate) {
    query.date = { $lte: new Date(endDate) };
  }

  Activity.find(query)
    .then((activities) => res.json(activities))
    .catch((err) => {
      console.error("Failed to fetch activities:", err);
      res.sendStatus(500);
    });
}); */

app.listen(port, (e) => {
	if (e) {
		console.log(e);
	}
	console.log(`Listening on port ${port}`);
});
