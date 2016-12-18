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
    <img src={props.profile.avatarUrl} style={style.avatar}></img>
    <div>ID: {props.profile.id}</div>
    <div>User: {props.profile.login}</div>
  </div>
);

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default Profile;
