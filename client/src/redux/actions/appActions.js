import {SHOW_ALERT, HIDE_ALERT} from '../types';


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
