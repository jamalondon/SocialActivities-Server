const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./src/index');
const port = process.env.PORT || 3000;

const DB = process.env.DATABASE_ENV.replace(
	'<password>',
	process.env.DATABASE_PASSWORD_ENV
);

mongoose.set('strictQuery', false);

mongoose
	.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.error('Failed to connect to MongoDB:', err));

app.listen(port, (e) => {
	if (e) {
		console.log(e);
	}
	console.log(`Listening on port ${port}`);
});
