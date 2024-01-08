const schedule = require('node-schedule');

const scheduleTask = () => {
  const date = new Date(2024, 0, 8, 15, 30); // Example date
  schedule.scheduleJob(date, function() {
    console.log('Scheduled task executed!');
  });
};

module.exports = { scheduleTask };
