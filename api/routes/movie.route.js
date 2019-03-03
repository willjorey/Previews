const express = require('express');
const movieRoutes = express.Router();
const fetch = require("node-fetch");

const API_KEY = 'e198d508cd4fa5279c8db3fdefaad9ab';

movieRoutes.route('/').get( async (req, res) => {
    try{
        let response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key='+ API_KEY +'&language=en-US&page=1');
        let movies = await response.json();
        res.status(201).json({
            message: "Handling GET requests to /movie",
            popular: movies,
          });
    }catch(e){
        console.log(e);
    }

})

movieRoutes.route('/search=:name').get( async (req, res) => {
    try{
        let name = req.params.name;
        let response = await fetch('https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&language=en-US&query=' + name +'&page=1&include_adult=false');
        let movie = await response.json();
        res.status(201).json({
            message: "Handling GET requests to /movie/search/" + name,
            Movie: movie,
          });
    }catch(e){
        console.log(e);
    }

})

module.exports = movieRoutes;
