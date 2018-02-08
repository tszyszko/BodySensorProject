import { applyMiddleware, createStore } from "redux"

import logger from "redux-logger"

import reducer from "./reducers"
import createSagaMiddleware from 'redux-saga'

import mySaga from './sagas/sagas'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(sagaMiddleware, logger())
));

sagaMiddleware.run(mySaga)
export default store;
