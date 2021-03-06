import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFiles,
  uploadFile,
  setCurrentDir,
} from "../../redux/actions/filesAction";
import { showPopup, setView } from "../../redux/actions/appActions";
import FileList from "../filelist/FileList";
import Popup from "../popup/Popup";
import "./disk.css";
import Uploader from "../uploader/Uploader";

function Disk() {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const dirStack = useSelector((state) => state.files.dirStack);
  const [dragEnter, setDragEnter] = useState(false);
  const [sort, setSort] = useState("sort");
  const loader = useSelector(state => state.app.loader);
  useEffect(() => {
    dispatch(getFiles(currentDir, sort));
  }, [currentDir, sort]);

  const backClickHandler = () => {
    const backDirId = dirStack.pop();
    dispatch(setCurrentDir(backDirId));
  };

  const showPopupHandler = () => {
    dispatch(showPopup("flex"));
  };

  const fileUploadHandler = (event) => {
    const files = [...event.target.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
  };

  const dragEnterHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(true);
  };

  const dragLeaveHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(false);
  };

  const dropHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let files = [...event.dataTransfer.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
    setDragEnter(false);
  };

  if(loader){
      return(
          <div className="loader">
              <div className="lds-dual-ring"></div>
          </div>
      )
  }

  return !dragEnter ? (
    <div
      className="disk"
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      <div className="disk__btns">
        {currentDir && (
          <button className="disk__back" onClick={() => backClickHandler()}>
            Back
          </button>
        )}
        <button className="disk__create" onClick={() => showPopupHandler()}>
          Create dir
        </button>
        <div className="disk__upload">
          <label htmlFor="disk__upload-input" className="disk__upload-label">
            Upload file
          </label>
          <input
            multiple={true}
            onChange={(event) => fileUploadHandler(event)}
            type="file"
            id="disk__upload-input"
            className="disk__upload-input"
          />
        </div>
        <select
          className="disk__select"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
        >
          <option value="name">by name</option>
          <option value="type">by type</option>
          <option value="date">by date</option>
          <option value="size">by size</option>
        </select>
        <button className="disk__plate" onClick={()=>dispatch(setView('plate'))}></button>
        <button className="disk__list" onClick={()=>dispatch(setView('list'))}></button>
      </div>
      <FileList />
      <Popup />
      <Uploader />
    </div>
  ) : (
    <div
      className="drop-area"
      onDrop={dropHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      Drag files here
    </div>
  );
}

export default Disk;
