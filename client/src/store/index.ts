import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer, { DefaultAppState } from './reducers';
import rootSaga from './sagas';



  const sagaMiddleware = createSagaMiddleware();

  const store: any = createStore(
    rootReducer,
    DefaultAppState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  )

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga)
  }
  store.runSagaTask()
  export default store


