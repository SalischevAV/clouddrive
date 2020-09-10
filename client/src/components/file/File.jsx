import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDir, pushToStack } from '../../redux/actions/filesAction';
import './file.css';
import dirLogo from '../../assets/img/dir.svg';
import fileLogo from '../../assets/img/file.svg';

function File({file}) {
  const dispatch = useDispatch();
  const currentDir = useSelector(state=> state.files.currentDir);
  const openDirHandler= ()=>{
    if(file.type === 'dir'){
      dispatch(pushToStack(currentDir));
      dispatch(setCurrentDir(file._id));
    }
  }
  return (
    <div className="file" onClick={()=>openDirHandler()}>
      <img src={file.type ==='dir' ? dirLogo : fileLogo} alt="" className="file__img" />
      <div className="file__name">{file.name}</div>
      <div className="file__date">{file.data.slice(0, 10)}</div>
      <div className="file__size">{file.size}</div>

    </div>
  );
}

export default File;