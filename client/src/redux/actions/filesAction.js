import { SET_FILES, SET_CURRENT_DIR, ADD_FILE, PUSH_TO_STACK, DELETE_FILE } from '../types';
import axios from 'axios';
import { showAlert } from './appActions';
import { addUploadFile, showUploader, changeUploadFile } from './uploaderAction';


export function setFiles(files) {
    return {
        type: SET_FILES,
        payload: files,
    }
}

export function setCurrentDir(dir) {
    return {
        type: SET_CURRENT_DIR,
        payload: dir,
    }
}

export function addFile(file) {
    return {
        type: ADD_FILE,
        payload: file,
    }
}

export function getFiles(dirId) {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5000/api/files${dirId ? '?parent=' + dirId : ''}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            dispatch(setFiles(response.data));
        }
        catch (err) {
            dispatch(showAlert(err.response.data.message))
        }
    }
}

export function createDir(dirId, name) {
    return async dispatch => {
        try {
            const response = await axios.post('http://localhost:5000/api/files', {
                name: name,
                parent: dirId,
                type: 'dir',
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            dispatch(addFile(response.data));
        }
        catch (err) {
            dispatch(showAlert(err.response.data.message))
        }
    }
}
export function pushToStack(dir) {
    return {
        type: PUSH_TO_STACK,
        payload: dir,
    }
}

export function uploadFile(file, dirId,) {
    return async dispatch => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            if (dirId) {
                formData.append('parent', dirId);
            }

            const uploadFile = {name: file.name, progress: 0, id: Date.now()};
            dispatch(showUploader());
            dispatch(addUploadFile(uploadFile));

            const response = await axios.post('http://localhost:5000/api/files/upload', formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ?
                        progressEvent.total :
                        progressEvent.target.getResponseHeader('content-length') ||
                        progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    console.log('total', totalLength);
                    if (totalLength) {
                        uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength);
                        dispatch(changeUploadFile(uploadFile));
                    }
                }
            });
            dispatch(addFile(response.data));
        }
        catch (err) {
            dispatch(showAlert(err.response.data.message))
        }
    }
}

export async function downloadFile(file){
    const response = await fetch(`http://localhost:5000/api/files/download?id=${file._id}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    if(response.status === 200){
        const blob = await response.blob();
        const downloadURL = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
}

export function deleteFile(file){
    return async dispatch =>{
        try{
            const response = await axios.delete(`http://localhost:5000/api/files?id=${file._id}`, {
              headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(delFile(file._id));
            dispatch(showAlert(response.data.message))
        } catch(err)
        {
            dispatch(showAlert(err.response.data.message))
        }
    }

}

export function delFile(dirId){
    return {
        type: DELETE_FILE,
        payload: dirId
    }
}