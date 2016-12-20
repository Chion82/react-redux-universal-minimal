import ZenService from '../services/zen';

const fetchZen = () => (dispatch) => {
  dispatch({
    type: 'zen/get'
  });
  return ZenService.getZen()
    .then((payload) => dispatch({
      type: 'zen/get/success',
      payload
    })).catch((error) => dispatch({
      type: 'zen/get/failed',
      error
    }));
};

export { fetchZen };
