import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import SagaManager from '../sagas/SagaManager';
import rootSaga from '../sagas';
import createReduxWaitForMiddleware from 'redux-wait-for-action';

const configureStore = (initialState) => {

  const sagaMiddleware = createSagaMiddleware();

  let enhancer = compose(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(createReduxWaitForMiddleware()),
    // eslint-disable-next-line
    (!__SERVER_SIDE__) && __DEVELOPMENT__ && window.devToolsExtension ? window.devToolsExtension() : f => f,
  );

  const store = createStore(rootReducer, initialState, enhancer);

  SagaManager.startSagas(sagaMiddleware, rootSaga);

  // eslint-disable-next-line
  if ((!__SERVER_SIDE__) && __DEVELOPMENT__ && module.hot) {
    module.hot.accept(
      '../reducers',
      () => {
        const nextRootReducer = require('../reducers').default;
        store.replaceReducer(nextRootReducer);
      }
    );

    module.hot.accept(
      '../sagas',
      () => {
        SagaManager.cancelSagas(store);
        const nextRootSaga = require('../sagas').default;
        SagaManager.startSagas(sagaMiddleware, nextRootSaga);
      }
    );
  }

  return store;
};

export default configureStore;
