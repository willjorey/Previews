const express = require('express');
const tvRoutes = express.Router();
const fetch = require("node-fetch");

const API_KEY = 'e198d508cd4fa5279c8db3fdefaad9ab';

tvRoutes.route('/').get( async (req, res) => {
    try{
        let response = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=' + API_KEY +'&language=en-US&page=1');
        let tv = await response.json();
        res.status(201).json({
            message: "Handling GET requests to /tv",
            popular: tv,
          });
    }catch(e){
        console.log(e);
    }

})

module.exports = tvRoutes;
