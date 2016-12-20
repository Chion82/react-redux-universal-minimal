const WAIT_FOR_ACTION = Symbol('WAIT_FOR_ACTION');
const ERROR_ACTION = Symbol('ERROR_ACTION');

const resolveActionQueue = {};
const rejectActionQueue = {};

export { WAIT_FOR_ACTION, ERROR_ACTION };

// eslint-disable-next-line
export default store => next => action => {

  if (resolveActionQueue[action.type]) {
    resolveActionQueue[action.type].forEach(resolveFunction =>
      resolveFunction(action.payload || action.data || {})
    );
    resolveActionQueue[action.type] = [];
  }

  if (rejectActionQueue[action.type]) {
    rejectActionQueue[action.type].forEach(rejectFunction =>
      rejectFunction(action.error || action.err || new Error('action.error not specified.'))
    );
    rejectActionQueue[action.type] = [];
  }

  if (!action[WAIT_FOR_ACTION]) {
    return next(action);
  }

  const resolveAction = action[WAIT_FOR_ACTION];
  const errorAction = action[ERROR_ACTION];
  
  if (!resolveActionQueue[resolveAction]) {
    resolveActionQueue[resolveAction] = [];
  }

  if (errorAction && (!rejectActionQueue[errorAction])) {
    rejectActionQueue[errorAction] = [];
  }

  const promise = new Promise((resolve, reject) => {
    resolveActionQueue[resolveAction].push(resolve);

    if (errorAction) {
      rejectActionQueue[errorAction].push(reject);
    }
  });

  return promise;

};
