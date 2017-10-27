import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../Reducers/index';
import createLogger from 'redux-logger';

const middlewares = [thunk];
let createStoreWithMiddleware = null;
if (process.env.NODE_ENV === 'development') {
  const logger = createLogger();
  middlewares.push(logger);
  createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
}

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  return store;
}
