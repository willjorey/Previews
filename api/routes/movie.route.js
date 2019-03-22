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

movieRoutes.route('/latest').get( async (req, res) => {
    try{
        let response = await fetch('https://api.themoviedb.org/3/movie/latest?api_key='+ API_KEY +'&language=en-US&page=1');
        let movies = await response.json();
        res.status(201).json({
            message: "Handling GET requests to /latest",
            latest: movies,
          });
        return movies;
    }catch(e){
        console.log(e);
    }
})

movieRoutes.route('/top_rated').get( async (req, res) => {
    try{
        let response = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key='+ API_KEY +'&language=en-US&page=1');
        let movies = await response.json();
        res.status(201).json({
            message: "Handling GET requests to /top",
            topRated: movies,
          });
        return movies;
    }catch(e){
        console.log(e);
    }
})

movieRoutes.route('/upcoming').get( async (req, res) => {
    try{
        let response = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key='+ API_KEY +'&language=en-US&page=1');
        let movies = await response.json();
        res.status(201).json({
            message: "Handling GET requests to /upcoming",
            upcoming: movies,
          });
        return movies;
    }catch(e){
        console.log(e);
    }
})

movieRoutes.route('/now_playing').get( async (req, res) => {
    try{
        let response = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key='+ API_KEY +'&language=en-US&page=1');
        let movies = await response.json();
        res.status(201).json({
            message: "Handling GET requests to /nowplaying",
            now_playing: movies,
          });
        return movies;
    }catch(e){
        console.log(e);
    }
})

movieRoutes.route('/search=:name').get( async (req, res) => {
    try{
        let name = req.params.name;
        let response = await fetch('https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&language=en-US&query=' + name +'&page=1&include_adult=false');
        if(response){
            let movie = await response.json();
            return movie
        }else{
            return 'Not Found'
        }
        
        res.status(201).json({
            message: "Handling GET requests to /movie/search/" + name,
            Movie: movie,
          });
    }catch(e){
        console.log(e);
    }

})

module.exports = movieRoutes;
