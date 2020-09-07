import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { fileReducer } from './fileReducer';
import { userReducer } from './userReducer';
import thunk  from 'redux-thunk'

export const rootReducer = combineReducers({
    user: userReducer,
    files: fileReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));