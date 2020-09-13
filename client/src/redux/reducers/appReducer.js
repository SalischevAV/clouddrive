import { SHOW_ALERT, HIDE_ALERT, SHOW_POPUP, SHOW_LOADER, HIDE_LOADER } from '../types';

const initialState = {
    alert: null,
    popupDisplay: 'none',
    loader: false,
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
        default: return state;
    }
}