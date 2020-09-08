import { LOGIN_USER, LOGOUT_USER } from '../types';
import axios from 'axios';
import { showAlert } from './appActions'

export function registration(email, password) {
    return async dispatch=>{
    try {
        const response = await axios.post('http://localhost:5000/api/auth/registration', {
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
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });
           
            dispatch(loginUser(response.data.user));
            localStorage.setItem('token', response.data.token);
            
        }
        catch (err) {
            console.log(err.response.data.message);
            dispatch(showAlert(err.message));
        }
    }
}

export function auth(email, password) {
    return async dispatch => {
        console.log(localStorage.getItem('token'))
        try {
            const response = await axios.get('http://localhost:5000/api/auth/login',
            {headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }}
            );
           console.log(response.data.user)
            dispatch(loginUser(response.data.user));
            localStorage.setItem('token', response.data.token);
            
        }
        catch (err) {
            console.log(err.response.data.message);
            dispatch(showAlert(err.message));
            localStorage.removeItem('token');
        }
    }
}

export function loginUser(user){
    return{
        type: LOGIN_USER,
        payload: user,
    }
}

export function logoutUser(){
    return {
        type: LOGOUT_USER,
    }
}