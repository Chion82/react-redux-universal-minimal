import React, { PropTypes } from 'react';

const style = {
  container : {
    textAlign: 'center'
  },
  avatar : {
    width: '100px',
    height: '100px',
    overflow: 'hidden',
    borderRadius: '50px'
  }
};

const Profile = props => (
  <div style={style.container}>
    <img src={props.profileInfo.avatarUrl} style={style.avatar}></img>
    <div>ID: {props.profileInfo.id}</div>
    <div>User: {props.profileInfo.login}</div>
  </div>
);

Profile.propTypes = {
  profileInfo: PropTypes.object.isRequired,
};

export default Profile;
