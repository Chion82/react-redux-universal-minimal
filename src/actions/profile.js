import ProfileService from '../services/profile';

const fetchProfile = () => (dispatch) => {
  dispatch({
    type: 'profile/get'
  });
  return ProfileService.getProfile('Chion82')
    .then((data) => dispatch({
      type: 'profile/get/success',
      data
    })).catch((error) => dispatch({
      type: 'profile/get/failed',
      error
    }));
};

export { fetchProfile };
