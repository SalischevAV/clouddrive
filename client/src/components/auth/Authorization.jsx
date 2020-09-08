import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import './auth.css';
import Input from '../common/Input';
import {login} from '../../redux/actions/userActions';

function Authorization() {
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const dispatch = useDispatch();
    return (
        <div className='authorization'>
            <div className="authorization__header">Login</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="enter email"/>
            <Input value={password} setValue={setPassword} type="password" placeholder="enter password"/>
            <button className="authorization__btn" onClick={()=>dispatch(login(email, password))}>Login</button>
        </div>
    )
}

export default Authorization
