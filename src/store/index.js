import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createRootReducer from '../reducers';

const configureStore = (initialState) => {
  let enhancer = compose(
    applyMiddleware(thunk),
    __DEVELOPMENT__ && window.devToolsExtension ? window.devToolsExtension() : f => f,
  );

  const store = createStore(createRootReducer(), initialState, enhancer);

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept(
      '../reducers',
      () => {
        const nextRootReducer = require('../reducers').default();
        store.replaceReducer(nextRootReducer);
      }
    );
  }

  return store;
};

export default configureStore;
