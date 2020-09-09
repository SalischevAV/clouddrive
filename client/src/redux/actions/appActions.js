import {SHOW_ALERT, HIDE_ALERT, SHOW_POPUP} from '../types';


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
