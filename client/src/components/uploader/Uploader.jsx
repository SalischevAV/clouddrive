import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UploadFile from '../uploadFile/UploadFile';
import './uploader.css';
import { HideUploader } from '../../redux/actions/uploaderAction';

function Uploader() {
    const files = useSelector(state => state.upload.files);
    const isVisible = useSelector(state =>state.upload.isVisible);
    const dispatch = useDispatch()

    return (isVisible &&
        <div className='uploader'>
            <div className="uploader__header">
                <div className="uploader__title">Upload</div>
                <button className="uploader__close" onClick={()=>dispatch(HideUploader())}>X</button>
            </div>
            {files.map(file => 
                <UploadFile key={file.id} file={file} />)}
        </div>
    )
}

export default Uploader
