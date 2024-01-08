const express = require('express');
const { scheduleTask } = require('./scheduler');
const app = express();
const port = process.env.PORT || 3000;

// Initialize scheduled tasks
scheduleTask();

// Express routes
app.get('/', (req, res) => {
  res.send('Hello, Hindsite!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

