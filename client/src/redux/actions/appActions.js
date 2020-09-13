import {SHOW_ALERT, HIDE_ALERT, SHOW_POPUP, SHOW_LOADER, HIDE_LOADER, SET_VIEW} from '../types';


export function showAlert(alert){
    return dispatch => {
        dispatch({
        type: SHOW_ALERT,
        payload: alert, 
    });

    setTimeout(()=>{
        dispatch(hideAlert())
    },3000);

}}

export function hideAlert(){
    return {
        type: HIDE_ALERT,
    }
}

export function showPopup(display){
    return{
        type: SHOW_POPUP,
        payload: display
    }
}

export function showLoader(){
    return{
        type: SHOW_LOADER,
    }
}

export function hideLoader(){
    return{
        type: HIDE_LOADER,
    }
}

export function setView(payload){
    return{
        type: SET_VIEW,
        payload: payload
    }
}