const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");

const movieRoute = require('./routes/movie.route');
const tvRoute = require('./routes/tv.route');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/movie', movieRoute);
app.use('/tv', tvRoute);


module.exports = app;