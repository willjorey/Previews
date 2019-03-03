const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");
const API_KEY = 'e198d508cd4fa5279c8db3fdefaad9ab';

const movieRoute = require('./routes/movie.route');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/movie', movieRoute);

module.exports = app;