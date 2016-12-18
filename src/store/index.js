import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const configureStore = (initialState) => {
  let enhancer = compose(
    applyMiddleware(thunk),
    // eslint-disable-next-line
    __DEVELOPMENT__ && window.devToolsExtension ? window.devToolsExtension() : f => f,
  );

  const store = createStore(rootReducer, initialState, enhancer);

  // eslint-disable-next-line
  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept(
      '../reducers',
      () => {
        const nextRootReducer = require('../reducers').default;
        store.replaceReducer(nextRootReducer);
      }
    );
  }

  return store;
};

export default configureStore;
