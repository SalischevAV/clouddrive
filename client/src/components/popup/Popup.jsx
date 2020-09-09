import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../common/Input';
import {showPopup} from '../../redux/actions/appActions';
import { createDir } from '../../redux/actions/filesAction';
import './popup.css';

function Popup() {
    const[dirName, setDirName] = useState('');
    const popupDisplay = useSelector(state => state.app.popupDisplay);
    const currentDir = useSelector(state => state.files.currentDir);
    const dispatch = useDispatch();
    const createHandler = ()=>{
        dispatch(createDir(currentDir, dirName));
        setDirName('');
        dispatch(showPopup('none'));
    }
    return (
        <div className='popup' style={{display: popupDisplay}} onClick={()=>{dispatch(showPopup('none'))}}>
            <div className="popup__content" onClick={event=>event.stopPropagation()}>
                <div className="popup__header">
                    <div className="popup__title"> Create new dir</div>
                    <button className="popupe__close" onClick={()=>{dispatch(showPopup('none'))}}>X</button>
                </div>
                <Input type='text' placeholder='Enter dir name' value={dirName} setValue={setDirName} />
                <button className="popup__create" onClick={()=>createHandler()}>Create</button>
            </div>
            
        </div>
    )
}

export default Popup
