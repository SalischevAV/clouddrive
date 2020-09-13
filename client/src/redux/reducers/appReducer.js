import { SHOW_ALERT, HIDE_ALERT, SHOW_POPUP, SHOW_LOADER, HIDE_LOADER, SET_VIEW } from '../types';

const initialState = {
    alert: null,
    popupDisplay: 'none',
    loader: false,
    view: 'list',
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return { ...state, alert: action.payload };
        case HIDE_ALERT:
            return { ...state, alert: null };
        case SHOW_POPUP:
            return { ...state, popupDisplay: action.payload };
        case SHOW_LOADER:
            return { ...state, loader: true };
        case HIDE_LOADER:
            return { ...state, loader: false };
        case SET_VIEW:
            return {...state, view:action.payload};
        default: return state;
    }
}