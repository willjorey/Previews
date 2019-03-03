const express = require('express');
const movieRoutes = express.Router();
const fetch = require("node-fetch");


movieRoutes.route('/').get( async (req, res) => {
    let response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=e198d508cd4fa5279c8db3fdefaad9ab&language=en-US&page=1');
    let movies = await response.json();
    res.status(201).json({
        message: "Handling GET requests to /movie",
        popular: movies,
      });})
module.exports = movieRoutes;
