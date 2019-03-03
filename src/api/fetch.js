import {TMDB_API_KEY} from '../../config.js';

export const searchMovies = async (movie) =>{
    let key = TMDB_API_KEY;
    try{
        const response = await fetch('https://api.themoviedb.org/3/search/movie?api_key='+ key +'&language=en-US&query='+
        movie +'&page=1&include_adult=false');
        const movies = await response.json();
        const results = movies.results;
        
        console.log(results);
    }catch(e){
        console.log(e)
    }

}