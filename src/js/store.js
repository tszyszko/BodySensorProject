import { applyMiddleware, createStore } from "redux"

import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import reducer from "./reducers"

// The thunk middleware allows us to return functions as actions
// The logger simply logs the next,prev and current state which is 
// really helpful for debugging
// The redux promise middleware enables optimistic updates and dispatches 
// pending, fulfilled and rejected actions. It can be combined with redux-thunk 
// to chain async actions.
const middleware = applyMiddleware(promise(), thunk, logger())

export default createStore(reducer, middleware)
