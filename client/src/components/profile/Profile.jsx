import React from "react";
import { useDispatch } from "react-redux";
import { uploadAvatar, deleteAvatar } from '../../redux/actions/userActions';

function Profile() {
  const dispatch = useDispatch();
  
  const changehandler = (e)=>{
     const file = e.target.files[0];
     dispatch(uploadAvatar(file));
     e.target.value = '';
  };

  return (
    <div>
      <button onClick={()=>dispatch(deleteAvatar()) }>Delete avatar</button>
      <input accepr='image/*' onChange={e=>changehandler(e)} type="file" placeholder="upload avatar" />
    </div>
  );
}

export default Profile;
