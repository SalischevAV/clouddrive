import { SET_FILES, SET_CURRENT_DIR, ADD_FILE, PUSH_TO_STACK, POP_FROM_STACK } from '../types';
import axios from 'axios';
import { showAlert } from './appActions';


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

            const response = await axios.post('http://localhost:5000/api/files/upload', formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ?
                        progressEvent.total :
                        progressEvent.target.getResponseHeader('content-length') ||
                        progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    console.log('total', totalLength);
                    if (totalLength) {
                        let progress = Math.round((progressEvent.loaded * 100) / totalLength);
                        console.log(progress);
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