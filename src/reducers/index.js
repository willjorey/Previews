import { combineReducers } from 'redux';

const SET_PROFILE = 'SET_PROFILE';

let profileState = {profile: {}};
const profileReducer = (state = profileState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            state = {...profileState, profile: action.profile};
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