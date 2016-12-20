const WAIT_FOR_ACTION = Symbol('WAIT_FOR_ACTION');
const ERROR_ACTION = Symbol('ERROR_ACTION');

const actionQueue = {};

export { WAIT_FOR_ACTION, ERROR_ACTION };

// eslint-disable-next-line
export default store => next => action => {

  if (actionQueue[action.type]) {
    actionQueue[action.type].forEach(resolveFunction => resolveFunction());
    actionQueue[action.type] = [];
  }

  if (!action[WAIT_FOR_ACTION]) {
    return next(action);
  }

  const resolveAction = action[WAIT_FOR_ACTION];
  const errorAction = action[ERROR_ACTION];
  if (!actionQueue[resolveAction]) {
    actionQueue[resolveAction] = [];
  }

  if (errorAction && (!actionQueue[errorAction])) {
    actionQueue[errorAction] = [];
  }

  const promise = new Promise((resolve, reject) => {
    actionQueue[resolveAction].push(resolve);

    if (errorAction) {
      actionQueue[errorAction].push(reject);
    }
  });

  return promise;

};
