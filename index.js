require("dotenv").config();

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require("mongoose");
const api = require('./routes/api')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }); 
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("Connection to db established"));

const PORT = process.env.PORT || 5000
const app = express();

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api', api);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
});