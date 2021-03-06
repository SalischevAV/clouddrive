import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentDir,
  pushToStack,
  downloadFile,
  deleteFile,
} from "../../redux/actions/filesAction";
import "./file.css";
import dirLogo from "../../assets/img/dir.svg";
import fileLogo from "../../assets/img/file.svg";
import sizeFormat from '../../utils/sizeFormat';

function File({ file }) {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const view = useSelector(state=> state.app.view);
  const openDirHandler = () => {
    if (file.type === "dir") {
      dispatch(pushToStack(currentDir));
      dispatch(setCurrentDir(file._id));
    }
  };

  function downloadClickHandler(event) {
    event.stopPropagation();
    downloadFile(file);
  }

  function deleteClickHandler(event) {
    event.stopPropagation();
    dispatch(deleteFile(file));
  }

  if(view === 'list'){
    return (
      <div className="file" onClick={() => openDirHandler()}>
        <img
          src={file.type === "dir" ? dirLogo : fileLogo}
          alt=""
          className="file__img"
        />
        <div className="file__name">{file.name}</div>
        <div className="file__date">{file.data.slice(0, 10)}</div>
        <div className="file__size">{sizeFormat(file.size)}</div>
        {file.type !== "dir" && (
          <button
            className="file__btn file__download"
            onClick={(event) => downloadClickHandler(event)}
          >
            download
          </button>
        )}
        <button
          className="file__btn file__delete"
          onClick={(event) => deleteClickHandler(event)}
        >
          delete
        </button>
      </div>
    );
  }

  if(view === 'plate'){
    return (
      <div className="file-plate" onClick={() => openDirHandler()}>
        <img
          src={file.type === "dir" ? dirLogo : fileLogo}
          alt=""
          className="file-plate__img"
        />
        <div className="file-plate__name">{file.name}</div>
        <div className="file-plate__btns">
        {file.type !== "dir" && (
          <button
            className="file-plate__btn file-plate__download"
            onClick={(event) => downloadClickHandler(event)}
          >
            download
          </button>
        )}
        <button
          className="file-plate__btn file-plate__delete"
          onClick={(event) => deleteClickHandler(event)}
        >
          delete
        </button>
        </div>
      </div>
    );
  }
  
  
}

export default File;
