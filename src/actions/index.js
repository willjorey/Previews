export const DATA_AVAILABLE = 'DATA_AVAILABLE';
export const SET_PROFILE = 'SET_PROFILE';
export const ADD_MOVIETOFAV = 'ADD_MOVIETOFAV';
export const SET_FAVTV = 'SET_FAVTV';



//Import the sample data
// import Data from '../instructions.json';
 
// export function getData(){
//     return (dispatch) => {
 
//         //Make API Call
//         //For this example, I will be using the sample data in the json file
//         //delay the retrieval [Sample reasons only]
//         setTimeout(() => {
//             const data  = Data.instructions;
//             dispatch({type: DATA_AVAILABLE, data:data});
//         }, 2000);
 
//     };
// };


export function setProfile(pro){
    return (dispatch) => {
        dispatch({type: SET_PROFILE, profile: pro});
    };
};

export function addFavMovie(movie){
    return (dispatch) => {
        dispatch({type: ADD_MOVIETOFAV, movie: movie});
    };
};

export function setFavTV(shows){
    return (dispatch) => {
        dispatch({type: SET_FAVTV, favTV: shows});
    };
};