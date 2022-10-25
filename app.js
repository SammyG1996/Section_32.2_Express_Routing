const express = require('express');
const app = express();
const userRoutes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This will route all items and add /items to the query
app.use('/items', userRoutes);













app.use(function(err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.message;

  // set the status and alert the user
  return res.status(status).json({
    error: {message, status}
  });
});

module.exports = app;

