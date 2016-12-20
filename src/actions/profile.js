import ProfileService from '../services/profile';

const fetchProfile = () => (dispatch) => {
  dispatch({
    type: 'profile/get'
  });
  return ProfileService.getProfile('Chion82')
    .then((payload) => dispatch({
      type: 'profile/get/success',
      payload
    })).catch((error) => dispatch({
      type: 'profile/get/failed',
      error
    }));
};

export { fetchProfile };
