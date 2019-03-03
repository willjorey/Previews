const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");

const movieRoute = require('./routes/movie.route');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/movie', movieRoute);

module.exports = app;