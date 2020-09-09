import { SET_FILES, SET_CURRENT_DIR, ADD_FILE } from '../types';
import axios from 'axios';
import { showAlert } from './appActions';


export function setFiles(files){
    return {
        type: SET_FILES,
        payload: files,
    }
}

export function setCurrentDir(dir){
    return {
        type: SET_CURRENT_DIR,
        payload: dir,
    }
}

export function addFile(file){
    return {
        type: ADD_FILE,
        payload: file,
    }
}

export function getFiles(dirId){
    return async dispatch =>{
        try{
            const response = await axios.get(`http://localhost:5000/api/files${dirId ? '?parent' + dirId : ''}`,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
           dispatch(setFiles(response.data));
        }
        catch(err)
        {
            dispatch(showAlert(err.response.data.message))
        }
    }
}

export function createDir(dirId, name){
    return async dispatch =>{
        try{
            const response = await axios.post('http://localhost:5000/api/files',{
                name: name,
                parent: dirId,
                type: 'dir',
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(addFile(response.data));
        }
        catch(err)
        {
            dispatch(showAlert(err.response.data.message))
        }
    }
}