import { combineReducers } from 'redux';

import { ADD_MOVIETOFAV, ADD_SHOWTOFAV , SET_PROFILE} from "../actions/";

let profileState = {profile: {movies: [], tv: []}};
const profileReducer = (state = profileState, action) => {
    switch (action.type) {
        case ADD_MOVIETOFAV:
                state = {...profileState};
                state.profile.movies.push(action.movie);
                return state;
        case ADD_SHOWTOFAV:
                state = {...profileState};
                state.profile.tv.push(action.show);
                return state;

        case SET_PROFILE:
            state = {...profileState };
            let movies = action.profile.profile.movies;
            let tv = action.profile.profile.tv;
            if(movies)
                state.profile.movies = [...state.profile.movies, ...movies]
            if(tv)
                state.profile.tv = [...state.profile.tv, ...tv]
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