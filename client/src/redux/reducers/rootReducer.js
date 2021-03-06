import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { fileReducer } from './fileReducer';
import { userReducer } from './userReducer';
import { appReducer } from './appReducer';
import {uploadReducer} from './uploadReducer';
import thunk  from 'redux-thunk'

export const rootReducer = combineReducers({
    user: userReducer,
    files: fileReducer,
    app: appReducer,
    upload: uploadReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));