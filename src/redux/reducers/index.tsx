import {combineReducers} from 'redux';

const rootReducer = combineReducers({
   //counter,
   //todos,
   // posts
})


export default combineReducers({});

export type RootState = ReturnType<typeof rootReducer>;