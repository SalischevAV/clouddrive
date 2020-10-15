import { LOGIN_USER, LOGOUT_USER } from '../types';
import axios from 'axios';
import { showAlert } from './appActions';
import {API_URL} from '../../config';

export function registration(email, password) {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/registration`, {
                email,
                password
            });
            dispatch(showAlert(response.data.message));
        }
        catch (err) {
            console.log(err.response.data.message);
            dispatch(showAlert(err.response.data.message));

        }
    }
}

export function login(email, password) {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, {
                email,
                password
            });

            dispatch(loginUser(response.data.user));
            localStorage.setItem('token', response.data.token);

        }
        catch (err) {
            console.log(err.response.data.message);
            dispatch(showAlert(err.response.data.message));
        }
    }
}

export function auth(email, password) {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}/api/auth/login`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            dispatch(loginUser(response.data.user));
            localStorage.setItem('token', response.data.token);

        }
        catch (err) {
            dispatch(showAlert(err.message));
            localStorage.removeItem('token');
        }
    }
}

export function uploadAvatar(file) {
    return async dispatch => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post(`${API_URL}/api/files/avatar`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            dispatch(loginUser(response.data));
           

        }
        catch (err) {
            dispatch(showAlert(err.message));
            console.log(err)
        
        }
    }
}

export function deleteAvatar() {
    return async dispatch => {
        try {
            const response = await axios.delete(`${API_URL}/api/files/avatar`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            dispatch(loginUser(response.data));
           

        }
        catch (err) {
            dispatch(showAlert(err.message));
            console.log(err)
        
        }
    }
}

export function loginUser(user) {
    return {
        type: LOGIN_USER,
        payload: user,
    }
}

export function logoutUser() {
    return {
        type: LOGOUT_USER,
    }
}