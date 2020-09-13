import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./navbar.css";
import Logo from "../../assets/img/navbar_logo.svg";
import { logoutUser } from "../../redux/actions/userActions";
import { searchFile, getFiles } from '../../redux/actions/filesAction';
import { showLoader } from '../../redux/actions/appActions';

export default () => {
  const [searchWord, setSearchWord] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(false);
  const currentDir = useSelector(state=> state.files.currentDir);
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();


  const searchChangeGandler = (event)=>{
    setSearchWord(event.target.value);
    if(searchTimeout){
      clearTimeout(searchTimeout);
    }
    if(event.target.value !== ''){
    setSearchTimeout(setTimeout((value)=>{
      dispatch(searchFile(value));
    }, 500, event.target.value))
  } else{
    dispatch(getFiles(currentDir));
  }
  }
  return (
    <div className="navbar">
      <div className="container">
        <img src={Logo} alt="navbar_logo" className="navbar__logo" />
        <div className="navbar__header">Cloud Drive</div>

        {isAuth && (
          <input
            className="input navbar__search"
            type="text"
            placeholder="search"
            value={searchWord}
            onChange={(event) => searchChangeGandler(event)}
          />
        )}
        {!isAuth && (
          <div className="navbar__login">
            <NavLink to="/login">Login</NavLink>
          </div>
        )}

        {!isAuth && (
          <div className="navbar__registration">
            <NavLink to="/registration">Registration</NavLink>
          </div>
        )}
        {isAuth && (
          <div className="navbar__login">
            <NavLink to="/" onClick={() => dispatch(logoutUser())}>
              Logout
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};
