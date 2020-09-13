import React from "react";
import { useSelector, useDispatch } from "react-redux";
import File from "../file/File";
import "./filelist.css";
import '../disk/disk.css';

function FileList() {
  const files = useSelector(state=> state.files.files);
  const view = useSelector(state=> state.app.view);

  if(files.length === 0){
    return (
      <div className="loader">Files not found</div>
    )
  }

  if(view === 'plate'){
    return (
      <div className="fileplate">
        {files.map(file => <File key={file._id} file={file} />)}
      </div>
    );
  }

  if(view === 'list'){
    return (
      <div className="filelist">
        <div className="filelist__header">
          <div className="filelist__name">Name</div>
          <div className="filelist__date">Date</div>
          <div className="filelist__size">Size</div>
        </div>
        {files.map(file => <File key={file._id} file={file} />)}
      </div>
    );
  }

  
}

export default FileList;
