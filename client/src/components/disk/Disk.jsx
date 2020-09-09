import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, createDir } from '../../redux/actions/filesAction';
import { showPopup } from '../../redux/actions/appActions'
import FileList from '../filelist/FileList';
import Popup from '../popup/Popup';
import './disk.css'

function Disk() {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir);
    useEffect(
        ()=>{
            dispatch(getFiles(currentDir))
        }, [currentDir]
    )

    function showPopupHandler(){
        dispatch(showPopup('flex'));
    }

    return (
        <div className='disk'>
            <div className="disk__btns">
                <button className="disk__back">Back</button>
                <button className="disk__create" onClick={()=> showPopupHandler()}>Create dir</button>
            </div>
            <FileList />
            <Popup />
        </div>
    )
}

export default Disk
