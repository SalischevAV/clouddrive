import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./navbar.css";
import Logo from "../../assets/img/navbar_logo.svg";
import { logoutUser } from "../../redux/actions/userActions";
import { searchFile, getFiles } from '../../redux/actions/filesAction';
import { API_URL } from '../../config';
import { showLoader } from '../../redux/actions/appActions';
import defaultAvatar from '../../assets/img/defaultAvatar.svg';

export default () => {
  const [searchWord, setSearchWord] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(false);
  const currentUser = useSelector(state => state.user.currentUser)
  const currentDir = useSelector(state=> state.files.currentDir);
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : defaultAvatar;


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
        <NavLink to='/' className="container">
          <img src={Logo} alt="navbar_logo" className="navbar__logo" />
          <div className="navbar__header">Cloud Drive</div>
        </NavLink>

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
        {isAuth && <NavLink to='/profile'>
                      <img src={avatar} alt='' className='navbar__avatar' />
                    </NavLink> }
      </div>
    </div>
  );
};
