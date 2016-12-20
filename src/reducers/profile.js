import { handleActions } from 'redux-actions';

const profile = handleActions({
  ['profile/get'](state) {
    return { ...state, loading: true, };
  },
  ['profile/get/success'](state, action) {
    return { ...state, loading: false,
      profileInfo: {
        avatarUrl: action.payload.avatar_url,
        id: action.payload.id,
        login: action.payload.login
      },
    };
  },
  ['profile/get/failed'](state, action) {
    return { ...state, loading: false, error: action.error, };
  }
}, {});

export default profile;
