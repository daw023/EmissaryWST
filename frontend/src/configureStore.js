/**
 * @author Anthony Altieri on 6/4/17.
 */

import { createStore, applyMiddleware } from 'redux';
import Root from './reducers/Root';
import { routerMiddleware } from 'react-router-redux';
import { saveState, loadState } from './localStorage';
import throttle from 'lodash/throttle';

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  if (!console.group) return rawDispatch;
  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = rawDispatch(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  }
};


const configureStore = (history) => {
  const persistedState = loadState();

  const middleware = routerMiddleware(history);


  const store = createStore(
    Root,
    persistedState,
    applyMiddleware(middleware)
  );

  // if (process.env.NODE_ENV === 'production')
    store.dispatch = addLoggingToDispatch(store);


  store.subscribe(throttle(() => {
    // let state = store.getState();
    // const curatedState = {
    //   user: {
    //     username: state.username,
    //     userId: state.userId,
    //   },
    //   channel: {
    //     channelId: state.
    //   }
    //
    // }
    saveState(store.getState());
    }, 500));

  return store;
};

export default configureStore;
