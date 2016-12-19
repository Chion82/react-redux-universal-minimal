import { handleActions } from 'redux-actions';

const zen = handleActions({
  ['zen/get'](state) {
    return { ...state, loading: true, };
  },
  ['zen/get/success'](state, action) {
    return { ...state, loading: false, text: action.data.text};
  },
  ['zen/get/failed'](state, action) {
    return { ...state, loading: false, error: action.error};
  }
}, {});

export default zen;
