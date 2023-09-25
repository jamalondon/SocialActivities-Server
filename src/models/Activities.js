const mongoose = require("mongoose");

// Define activity schema
const activitySchema = new mongoose.Schema({
  title: String,
  description: String,
  time: String,
  date: Date,
});

// Define activity model
const Activity = mongoose.model("Activity", activitySchema);

// Start the server
app.listen(3000, () => console.log("Server listening on port 3000"));
