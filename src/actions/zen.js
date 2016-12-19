import ZenService from '../services/zen';

const fetchZen = () => (dispatch) => {
  dispatch({
    type: 'zen/get'
  });
  return ZenService.getZen()
    .then((data) => dispatch({
      type: 'zen/get/success',
      data
    })).catch((error) => dispatch({
      type: 'zen/get/failed',
      error
    }));
};

export { fetchZen };
