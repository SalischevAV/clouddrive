import { SET_FILES, SET_CURRENT_DIR, ADD_FILE } from '../types';

const initialState={
    files: [],
    currentDir: null
}

export const fileReducer = (state=initialState, action) =>{
    switch(action.type){
        case SET_FILES:
            return {...state, files: action.payload};
        case SET_CURRENT_DIR:
            return {...state, currentDir: action.payload};
        case ADD_FILE:
            return {...state, files:[...state.files, action.payload]};
        default: return state;
    }
}