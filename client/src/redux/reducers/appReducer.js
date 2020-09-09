import { SHOW_ALERT, HIDE_ALERT, SHOW_POPUP} from '../types';

const initialState ={
    alert: null,
    popupDisplay: 'none'
}

export const appReducer = (state=initialState, action)=> {
    switch(action.type){
        case SHOW_ALERT:
            return {...state, alert: action.payload};
        case HIDE_ALERT:
                return {...state, alert: null};
        case SHOW_POPUP:
            return {...state, popupDisplay:action.payload};
        default: return state;
    }
}