import { combineReducers } from 'redux';

import { ADD_MOVIETOFAV, SET_FAVTV , SET_PROFILE} from "../actions/";

let profileState = {profile: {movies: [], tv: []}};
const profileReducer = (state = profileState, action) => {
    switch (action.type) {
        case ADD_MOVIETOFAV:
                state = {...profileState};
                state.profile.movies.push(action.movie);
                return state;
        case SET_PROFILE:
        console.log(action.profile)
            state = {...profileState };
            let movies = action.profile.profile.movies;
            let tv = action.profile.profile.tv;
            if( movies.length > 0)
                state.profile.movies = [...state.profile.movies, ...movies]
            if( tv.length > 0)
                state.profile.tv = [...state.profile.movies, ...tv]
            return state;
        default:
            return state;
    }
}

// Combine all the reducers
const rootReducer = combineReducers({
    profileReducer
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})
 
export default rootReducer;