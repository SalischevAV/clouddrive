import { SET_FILES, SET_CURRENT_DIR, ADD_FILE, PUSH_TO_STACK, DELETE_FILE } from '../types';

const initialState={
    files: [],
    currentDir: null,
    dirStack:[]
}

export const fileReducer = (state=initialState, action) =>{
    switch(action.type){
        case SET_FILES:
            return {...state, files: action.payload};
        case SET_CURRENT_DIR:
            return {...state, currentDir: action.payload};
        case ADD_FILE:
            return {...state, files:[...state.files, action.payload]};
        case PUSH_TO_STACK:
            return {...state, dirStack:[...state.dirStack, action.payload]};
        case DELETE_FILE:
            return{ ...state, files:[...state.files.filter(file => file._id !== action.payload)]};
        default: return state;
    }
}