const WAIT_FOR_ACTION = Symbol('WAIT_FOR_ACTION');

const actionQueue = {};

export { WAIT_FOR_ACTION };

export default store => next => action => {

  if (actionQueue[action.type]) {
    actionQueue[action.type].forEach(resolveFunction => resolveFunction());
    actionQueue[action.type] = [];
  }

  if (!action[WAIT_FOR_ACTION]) {
    return next(action);
  }

  const actionToWait = action[WAIT_FOR_ACTION];
  if (!actionQueue[actionToWait]) {
    actionQueue[actionToWait] = [];
  }

  const promise = new Promise((resolve) => {
    actionQueue[actionToWait].push(resolve);
  });

  return promise;

};
