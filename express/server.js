
const express = require('express');
const app = express();
const apiPort = 8000;

// ---

app.listen(apiPort);

app.use(express.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// ---

const user = require('./routes/user').router;
app.use('/api/user', user());
