import { handleActions } from 'redux-actions';

const profile = handleActions({
  ['profile/get'](state) {
    return { ...state, loading: true, };
  },
  ['profile/get/success'](state, action) {
    return { ...state, loading: false, avatarUrl: action.data.avatar_url, id: action.data.id, login: action.data.login};
  },
  ['profile/get/failed'](state, action) {
    return { ...state, loading: false, error: action.error};
  }
}, {});

export default profile;
